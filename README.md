<div align="center">

<img src="frontend/public/icons/icon-512.png" width="200"/>

  <h1>Finish the Drawing!</h1>

  <h3>✏️ Daily competitions to finish the drawing</h3>

[![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://console.cloud.google.com/compute/instances?authuser=1&project=finish-the-drawing-413709)
[![Squarespace Domains](https://img.shields.io/badge/Squarespace%20Domains-green?style=flat&link=https://img.shields.io/badge/https%3A%2F%2Faccount.squarespace.com%2Fdomains)](https://account.squarespace.com/domains)

</div>

# Overview

Every day we generate a random scribble and a new word. Your goal is to use your imagination to use that scribble to create a drawing of that word. You can view and rank other users submissions, and the top three drawings of the day will win.

# Services

| Service  | Tool      | Doc | Image                                                                 |
| -------- | --------- | --- | --------------------------------------------------------------------- |
| api      | GORM, Gin | -   | [ghcr](https://github.com/nbaker47/ftd/pkgs/container/ftd%2Fapi)      |
| frontend | Next.js   | -   | [ghcr](https://github.com/nbaker47/ftd/pkgs/container/ftd%2Ffrontend) |

# CICD

GitHub Workflows will handle the building and pushing of the containers when the commit message used t push to main contains the relevant command: `build-api` or `build-frontend`. Our pods will pull the latest one on restart.
