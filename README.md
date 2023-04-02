# Cats

A proof-of-concept web app that allows you to rate pictures of cats. You can even submit your own cat to the database for others to rate their cuteness.

All cats have a perfect score of 10!



## TODOs
- [ ] Wire up submission form
- [ ] drag and drop images with preview
- [ ] upload to azure blob storage?

- [ ] clean up
  - [ ] Move docker-compose to root
  - [ ] Rename mantine-vite directory to frontend
  - [ ] Typescript types

- [ ] make an azd template on aca (frontend, backend, database- postgres)
  - [ ] can i use a predeploy hook for azd?
- [ ] mark as template repo
- [ ] submit to awesome azd

- [ ] stretch features
  - [ ] image recognition with pytorch for validation that the image is a cat?
  - [ ] add spinner on rating cat with delay
  - [ ] make it so that you can't rate cats more than once (use local storage?)
  - [ ] make the all cats page sorted from highest to lowest (make it a scoreboard)