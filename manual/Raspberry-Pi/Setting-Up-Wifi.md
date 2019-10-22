---
menu: Raspberry Pi
name: Setting Up Wifi
---

# Setting Up Wifi

## Command Line

```shell
# find the SD card
diskutil list
diskutil unmountDisk /dev/disk<disk# from diskutil>
sudo dd bs=1m if=path/to/distro.img of=/dev/rdisk<disk# from diskutil> conv=sync
sudo diskutil ejectDisk /dev/rdisk<disk# from diskutil>
ls -ls /Volumes/ # check for new boot volume
touch /Volumes/boot/ssh
vi /Volumes/boot/wpa_supplicant.conf
```

Insert the following for the `conf` file:

```
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="NETWORK-NAME"
    psk="NETWORK-PASSWORD"
}
```

Then run `diskutil eject /dev/disk{#}`

If you get `dd: invalid number '1m'` error, change `bs=1m` to `bs=1M`.

If it still fails, swap `disk` for `rdisk`.

Reference: https://www.raspberrypi.org/documentation/installation/installing-images/mac.md

The better setup reference: https://desertbot.io/blog/setup-pi-zero-w-headless-wifi

## Login Over Wifi

```shell
ssh-keygen -R raspberrypi.local
ssh pi@raspberrypi.local
```

## Debian Distros

The Raspbian distros can be downloaded from https://www.raspberrypi.org/downloads/raspbian
