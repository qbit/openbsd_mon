openbsd_mon ꙫ
=============
![OpenBSD](https://raw.github.com/qbit/openbsd_mon/master/banner1.gif)

This app monitors the primary OpenBSD mirror for updated snapshots or
packages for various arches. 

Once an update happens, it sends a pubsub to redis on the channels: **mcchunkie:openbsd:$arch:{$packages,$sets}**
