### Browser Linux url parameters
You can pass parameters to Browser linux by adding ? at the end. You can separate multiples with the & symbol. Anything other that ```true``` is considered false.

- iso=\<*iso file*> [default rootfs.iso]
  - This allows you to pass a custom iso file. Browser Linux comes with 2 isos which are rootfs.iso and minimal.iso.
- screen=\<*true*> [default none]
  - When this is set to true the screen does not automatically hide on boot
  - When this is set to false the screen is hidden immediately and not show
- cmd=\<*command*> [default none]
  - This allows you to run a command as soon as the is a shell. You can run anything from ```pfetch``` to ```vim```. 
- autosave=\<*number of seconds*> [default 30]
  - This enables autosave. It defaults saving every 30 seconds but it can be any number greater than zero. see [saving.md](saving.md)
- embed=\<*true*> [default false]
  - This option removes all functionality except for the terminal and the *save* button. See [embed.html](embed.html)
- async=\<*true*> [default false]
  - This loads the image as needed instead of all at once. It can make it faster in some cases but usually causes more problems than is solves.
- mem=\<number of mb> [default 256]
  - This changes the amount of ram. Currently there is no error handling for snapshots that have different amounts of ram. If a previous save is restored on load the ram will be the same as it was in the snapshot.
