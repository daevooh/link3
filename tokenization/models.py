from django.db import models
import uuid
from users.models import Project, AppUser
from django.utils import timezone

class ActionType(models.Model):
    """
    Model representing different types of actions that can be rewarded with tokens
    """
    id = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    is_standard = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class TokenizationRule(models.Model):
    """
    Rules for token rewards based on user actions
    """
    ACTION_TYPES = [
        ('login', 'Login'),
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('share', 'Share'),
        ('purchase', 'Purchase'),
        ('video_watch', 'Video Watch'),
        ('profile_completion', 'Profile Completion'),
        ('custom', 'Custom Action'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tokenization_rules')
    action_type = models.CharField(max_length=50, choices=ACTION_TYPES)
    custom_action_name = models.CharField(max_length=100, blank=True, null=True)
    base_amount = models.DecimalField(max_digits=18, decimal_places=8)
    cooldown_hours = models.FloatField(null=True, blank=True)
    cooldown_minutes = models.FloatField(null=True, blank=True)
    one_time = models.BooleanField(default=False)
    multiplier = models.FloatField(null=True, blank=True)
    min_duration_seconds = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Add the description field
    description = models.TextField(blank=True, help_text="Description of the tokenization rule")
    
    # Add code snippet field
    code_snippet_js = models.TextField(blank=True, help_text="JavaScript code snippet for implementing this rule")
    code_snippet_react = models.TextField(blank=True, help_text="React code snippet for implementing this rule")
    code_snippet_html = models.TextField(blank=True, help_text="HTML/jQuery code snippet for implementing this rule")
    code_snippet_sdk = models.TextField(blank=True, help_text="Link3 SDK initialization code snippet")
    
    class Meta:
        unique_together = ('project', 'action_type', 'custom_action_name')
        
    def __str__(self):
        if self.action_type == 'custom' and self.custom_action_name:
            return f"{self.project.name} - {self.custom_action_name}"
        return f"{self.project.name} - {self.action_type}"
    
    def save(self, *args, **kwargs):
        """
        Override save method to generate code snippets before saving
        """
        # Generate code snippets if they don't exist
        if not self.code_snippet_js or not self.code_snippet_react or not self.code_snippet_html:
            self.generate_code_snippets()
        
        super().save(*args, **kwargs)
    
    def generate_code_snippets(self):
        """
        Generate code snippets for this rule based on its properties
        """
        # Determine the action name (use custom name if applicable)
        action = self.custom_action_name if self.action_type == 'custom' else self.action_type
        action_display = action.replace('_', ' ').title()
        function_name = action.title().replace('_', '')
        
        # Create a description of the rule based on its properties
        rule_desc = f"Rewards {self.base_amount} tokens"
        if self.cooldown_hours or self.cooldown_minutes:
            cooldown = []
            if self.cooldown_hours:
                cooldown.append(f"{self.cooldown_hours} hour(s)")
            if self.cooldown_minutes:
                cooldown.append(f"{self.cooldown_minutes} minute(s)")
            rule_desc += f" with a cooldown of {' and '.join(cooldown)}"
        elif self.one_time:
            rule_desc += " once per user"
            
        if self.multiplier:
            rule_desc += f" with a {self.multiplier}x multiplier"
            
        if self.min_duration_seconds and self.action_type == 'video_watch':
            rule_desc += f" after watching for at least {self.min_duration_seconds} seconds"
        
        # Generate SDK initialization snippet
        sdk_snippet = f"""// Link3 SDK initialization for {self.project.name}
// Include this code in your app's initialization

// Import the SDK
// <script src="https://cdn.link3.dev/sdk/latest/link3-sdk.js"></script>

document.addEventListener('DOMContentLoaded', function() {{
    // Initialize Link3 SDK with your project API key
    Link3SDK.init({{
        apiKey: '{self.project.api_key}',
        projectId: '{self.project.id}',
        debug: false,  // Set to true for development
        onUserIdentified: function(userData) {{
            console.log('User identified:', userData);
            // Update UI or store user information
        }},
        onBalanceUpdate: function(newBalance) {{
            console.log('Token balance updated:', newBalance);
            // Update token balance display
        }}
    }});
    
    // Check if user already exists
    Link3SDK.getUser().then(user => {{
        if (user) {{
            console.log('Existing user:', user);
            // Update UI for returning user
        }} else {{
            console.log('New user');
            // Show onboarding for new user
        }}
    }});
}});
"""
        self.code_snippet_sdk = sdk_snippet
        
        # Generate JavaScript snippet with more detailed comments
        js_snippet = f"""// JavaScript implementation for {action_display} action
// {rule_desc}

/**
 * Tracks a {action_display} action and awards tokens based on the rule
 * @returns {{Promise}} Promise that resolves with the token reward result
 */
function track{function_name}Action({{{self._get_metadata_params()}}}) {{
    // Ensure SDK is initialized before calling
    return Link3SDK.trackAction('{action}', {{
        {self._get_metadata_js()}
    }})
    .then(result => {{
        if (result.success) {{
            console.log(`{action_display} successful! Earned ${{result.tokens_earned}} tokens`);
            console.log(`New balance: ${{result.token_balance}}`);
            return result;
        }} else {{
            console.error(`{action_display} tracking failed:`, result.error);
            // Handle error (could be cooldown period, one-time limit, etc.)
            if (result.error === 'cooldown') {{
                console.log(`You need to wait before earning tokens for this action again`);
            }}
            throw result.error;
        }}
    }});
}}

// Usage example
document.getElementById('{action}-button').addEventListener('click', function() {{
    track{function_name}Action({self._get_example_params()})
        .then(result => {{
            // Update UI to show tokens earned
            document.getElementById('token-display').textContent = result.token_balance;
        }})
        .catch(error => {{
            // Handle errors
            console.error('Error tracking {action}:', error);
        }});
}});
"""
        self.code_snippet_js = js_snippet
        
        # Generate React snippet with better component structure
        react_snippet = f"""// React implementation for {action_display} action
// {rule_desc}

import React, {{ useState, useEffect }} from 'react';
import {{ toast }} from 'react-toastify'; // Optional for notifications

const {function_name}Component = () => {{
    const [tokenBalance, setTokenBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {{
        // Get initial token balance
        Link3SDK.getUser().then(user => {{
            if (user) {{
                setTokenBalance(user.token_balance);
            }}
        }});
    }}, []);
    
    const handle{function_name} = async () => {{
        setLoading(true);
        setError(null);
        
        try {{
            const result = await Link3SDK.trackAction('{action}', {{
                {self._get_metadata_js()}
            }});
            
            if (result.success) {{
                setTokenBalance(result.token_balance);
                // Show success notification
                toast.success(`You earned ${{result.tokens_earned}} tokens!`);
            }}
        }} catch (err) {{
            setError(err.message || 'Failed to track action');
            toast.error(err.message || 'Failed to track action');
        }} finally {{
            setLoading(false);
        }}
    }};
    
    return (
        <div className="token-action-container">
            <h3>{action_display} Action</h3>
            <p className="description">{rule_desc}</p>
            
            <button 
                onClick={{handle{function_name}}} 
                disabled={{loading}}
                className="action-button"
            >
                {{loading ? 'Processing...' : '{action_display}'}}
            </button>
            
            {{error && <p className="error-message">{{error}}</p>}}
            
            <div className="token-balance">
                <span>Your token balance:</span>
                <strong>{{tokenBalance}}</strong>
            </div>
        </div>
    );
}};

export default {function_name}Component;
"""
        self.code_snippet_react = react_snippet
        
        # Generate HTML/jQuery snippet with better user feedback
        html_snippet = f"""<!-- HTML/jQuery implementation for {action_display} action -->
<!-- {rule_desc} -->

<!-- Include the Link3 SDK in your page -->
<script src="https://cdn.link3.dev/sdk/latest/link3-sdk.js"></script>

<div class="link3-action">
    <h3>{action_display} Action</h3>
    <p class="description">{rule_desc}</p>
    
    <button id="{action}-button" class="action-button">{action_display}</button>
    
    <div class="token-result" style="display: none;">
        <p>You earned <span class="tokens-earned">0</span> tokens!</p>
        <p>Your balance: <span class="token-balance">0</span> tokens</p>
    </div>
    
    <div class="error-message" style="display: none; color: red;"></div>
    
    <div class="cooldown-timer" style="display: none;">
        Next reward available in: <span class="time-remaining"></span>
    </div>
</div>

<script>
$(document).ready(function() {{
    // Initialize the SDK
    Link3SDK.init({{
        apiKey: '{self.project.api_key}',
        projectId: '{self.project.id}'
    }});
    
    // Get initial token balance
    Link3SDK.getUser().then(function(user) {{
        if (user) {{
            $(".token-balance").text(user.token_balance);
        }}
    }});
    
    // Handle {action} button click
    $("#{action}-button").click(function() {{
        // Disable button during processing
        var $button = $(this).prop('disabled', true);
        $(".error-message").hide();
        
        // Track the {action} action
        Link3SDK.trackAction('{action}', {{
            {self._get_metadata_js()}
        }}).then(function(result) {{
            if (result.success) {{
                // Show success notification
                $(".tokens-earned").text(result.tokens_earned);
                $(".token-balance").text(result.token_balance);
                $(".token-result").fadeIn().delay(5000).fadeOut();
            }}
        }}).catch(function(error) {{
            // Handle errors
            $(".error-message").text(error.message || 'Failed to track action').show();
            
            // Handle cooldown specifically
            if (error.code === 'cooldown' && error.remainingTime) {{
                var minutes = Math.floor(error.remainingTime / 60);
                var seconds = error.remainingTime % 60;
                $(".time-remaining").text(minutes + 'm ' + seconds + 's');
                $(".cooldown-timer").show();
            }}
        }}).finally(function() {{
            // Re-enable button
            $button.prop('disabled', false);
        }});
    }});
}});
</script>
"""
        self.code_snippet_html = html_snippet

    def _get_metadata_params(self):
        """Helper method to generate parameter list based on action type"""
        if self.action_type == 'video_watch':
            return "videoId, durationSeconds = 0, completionPercentage = 0"
        elif self.action_type == 'purchase':
            return "amount, productId, currency = 'USD'"
        elif self.action_type == 'profile_completion':
            return "fieldsCompleted, totalFields"
        elif self.action_type == 'share':
            return "contentId, platform"
        elif self.action_type == 'like':
            return "contentId"
        elif self.action_type == 'comment':
            return "contentId, commentText"
        elif self.action_type == 'custom':
            return "metadata = {}"
        else:
            return "metadata = {}"
    
    def _get_metadata_js(self):
        """Helper method to generate metadata object based on action type"""
        if self.action_type == 'video_watch':
            return "video_id: videoId,\n        duration_seconds: durationSeconds,\n        completion_percentage: completionPercentage"
        elif self.action_type == 'purchase':
            return "amount: amount,\n        product_id: productId,\n        currency: currency"
        elif self.action_type == 'profile_completion':
            return "fields_completed: fieldsCompleted,\n        total_fields: totalFields"
        elif self.action_type == 'share':
            return "content_id: contentId,\n        platform: platform"
        elif self.action_type == 'like':
            return "content_id: contentId"
        elif self.action_type == 'comment':
            return "content_id: contentId,\n        comment_text: commentText"
        elif self.action_type == 'custom':
            return "// Include any custom metadata needed for tracking"
        else:
            return "// Include any relevant metadata for tracking"
    
    def _get_example_params(self):
        """Helper method to generate example parameters for function calls"""
        if self.action_type == 'video_watch':
            return "'video-123', 120, 75"
        elif self.action_type == 'purchase':
            return "19.99, 'premium-plan', 'USD'"
        elif self.action_type == 'profile_completion':
            return "5, 8"
        elif self.action_type == 'share':
            return "'post-456', 'twitter'"
        elif self.action_type == 'like':
            return "'post-789'"
        elif self.action_type == 'comment':
            return "'post-789', 'Great content!'"
        elif self.action_type == 'custom':
            return "{ customData: 'example' }"
        else:
            return "{}"

class Interaction(models.Model):
    """
    Records user interactions that earned tokens
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='interactions')
    action_type = models.CharField(max_length=50)
    tokens_earned = models.DecimalField(max_digits=18, decimal_places=8)
    metadata = models.JSONField(default=dict, blank=True)
    timestamp = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.user} - {self.action_type} - {self.tokens_earned} tokens"
