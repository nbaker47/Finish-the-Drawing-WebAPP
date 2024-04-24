<div align="center">

<img src="media/icon-512.png" width="200"/>

  <h1>Finish the Drawing!</h1>

  <h3>✏️ Daily competitions to finish the drawing</h3>

[![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://console.cloud.google.com/compute/instances?authuser=1&project=finish-the-drawing-413709)
[![Squarespace Domains](https://img.shields.io/badge/Squarespace%20Domains-green?style=flat&link=https://img.shields.io/badge/https%3A%2F%2Faccount.squarespace.com%2Fdomains)](https://img.shields.io/badge/https%3A%2F%2Faccount.squarespace.com%2Fdomains)

</div>

# Overview

Every day we generate a random scribble and a new word. Your goal is to use your imagination to use that scribble to create a drawing of that word. You can view and rank other users submissions, and the top three drawings of the day will win.

# Services

| Service  | Tool                                                                                                           | Doc | Image |
| -------- | -------------------------------------------------------------------------------------------------------------- | --- | ----- |
| api      | <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" />, GORM, Gin    | -   | -     |
| frontend | <img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> | -   | -     |

# CICD

GitHub Workflows will handle the building and pushing of the containers when the relevant service has been modified. Our pods will pull the latest one on restart.
