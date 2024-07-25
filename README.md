# all-your-base
Keep track of Minecraft bases with this simple Node.js Express app.

Run as a Docker container using the following compose.yml:

```
services:
  all-your-base:
    image: davescodemusings/all-your-base:latest
    container_name: all-your-base
    hostname: all-your-base
    restart: unless-stopped
    ports:
      - "2101:2101"
    volumes:
      - ./data:/app/data
```

Point your web browser to http://IP.AD.DR.ESS:2101/

Features:
* Sortable columns by clicking headings in web interface.
* Mobile friendly design adjusts interface for smaller screen.
* All backend data kept in human-readable JSON file.
* Reload JSON from file after hand edits by sending HUP signal (e.g. `docker kill --signal="HUP" <container-id>`).

Screenshots:
![Screenshot](doc/screenshot.png)

Adding a new base:
* [Desktop](doc/add-base-desktop.png)
* [Mobile](doc/add-base-mobile.png)
