'use strict';
var drev = require( 'drev' ),
  nmon = require( 'nmon' ),
  mon = new nmon(),
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
  ];

var i = 0, l = services.length;

function update( o ) {
    drev.emit( 'mcchunkie', o.name + '^' + o.date );
}

for ( i = 0; i < l; i++ ) {
  var a = services[i];
  mon.create( 'http', a );
  mon.on( a.name, update );
}

mon.monitor();

drev.start();
