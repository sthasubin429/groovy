from django.contrib.auth.models import User
from django.db import models

from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from django.template.loader import render_to_string


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "http://localhost:3000/passwordResetConfirm/{}".format(reset_password_token.key)

    msg_plain = render_to_string('email.txt', {'link': email_plaintext_message})
    msg_html = render_to_string('email.html', {'link': email_plaintext_message})

    send_mail(
        "Password Reset for {title}".format(title="Groovy"),
        msg_plain,
        "stha.groovy@gmail.com",
        [reset_password_token.user.email],
        html_message=msg_html,
    )

    # send_mail(
    #     # title:
    #     "Password Reset for {title}".format(title="Groovy"),
    #     # message:
    #     email_plaintext_message,
    #     # from:
    #     "stha.groovy@gmail.com",
    #     # to:
    #     [reset_password_token.user.email]
    # )


# Create your models here.
class UserProfile(models.Model):
    first_name = models.CharField(default='FirstName', max_length=200)
    last_name = models.CharField(default='LastName', max_length=200)
    profile_picture = models.ImageField(default='profile/default.jpg', upload_to="profile")
    bio = models.TextField(default='Hi')
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)

    def __str__(self):
        return self.first_name

    @property
    def getUsername(self):
        return self.user.username