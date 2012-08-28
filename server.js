'use strict';
var redis = require( 'redis' ),
  rclient = redis.createClient(),
  nmon = require( 'nmon' ),
  mon = new nmon(),
  // date = new Date( '1999' ),
  date,
  cos = false,
  services = [
    { 
      name: 'openbsd^amd64^sets',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/amd64/SHA256'
    },
    { 
      name: 'openbsd^amd64^packages',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/packages/amd64/SHA256'
    },
    { 
      name: 'openbsd^i386^sets',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/i386/SHA256'
    },
    { 
      name: 'openbsd^i386^packages',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/packages/i386/SHA256'
    },
    { 
      name: 'openbsd^loongson^sets',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/loongson/SHA256'
    },
    { 
      name: 'openbsd^loongson^packages',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/packages/mips64el/SHA256'
    },
    { 
      name: 'openbsd^macppc^sets',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/macppc/SHA256'
    },
    { 
      name: 'openbsd^macppc^packages',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/packages/powerpc/SHA256'
    },
  ];

var i = 0, l = services.length;

function update( o ) {
  rclient.publish( 'mcchunkie', o.name + '^' + o.date );
}

for ( i = 0; i < l; i++ ) {
  var a = services[i];
  mon.create( 'http', a );
  mon.on( a.name, update );
}

mon.monitor();
