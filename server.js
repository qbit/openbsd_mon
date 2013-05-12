'use strict';
var redis = require( 'redis' ),
  fs = require( 'fs' ),
  pushover = require( 'pushover-notifications' ),
  push,
  rclient = redis.createClient(),
  nmon = require( 'nmon' ),
  mon = new nmon(),
  noties,
  msg_for,
  notie_list = "list.json",
  msg = {},
  key_file = "key.json",
  key = '',
  // date = new Date( '1999' ),
  date,
  // cos = true,
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
      name: 'openbsd^armish^sets',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/armish/SHA256'
    },
    { 
      name: 'openbsd^arm^packages',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/packages/arm/SHA256'
    },
    { 
      name: 'openbsd^octeon^sets',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/octeon/SHA256'
    },
    { 
      name: 'openbsd^octeon^packages',
      interval: 3600000,
      check_on_start: cos,
      forced_date: date,
      url: 'http://ftp.openbsd.org/pub/OpenBSD/snapshots/packages/mips64/SHA256'
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

function loadNoties( fn ) {
  fs.readFile( notie_list, function( err, data ) {
    if ( err ) {
      throw err;
    }

    noties = JSON.parse( data );
    fn.call();
  });
}

function update( o ) {
  var parts, i, l;
  loadNoties( function() {
    parts = o.name.split( '^' );

    msg.title = 'New ' + parts[2] + ' for ' + parts[1] + ' (' + o.date + ')';
    msg.timestamp = o.date;
    msg.message = '<3';

    rclient.publish( 'mcchunkie', o.name + '^' + o.date );


    for ( i = 0, l = noties.length; i < l; i++ ) {
      msg_for = noties[i].split( '^' );
      msg.user = msg_for[0];

      if ( msg_for[1].match( parts[1] ) ) {
        push.send( msg, function( err, res ) {
          if ( err ) {
            throw err;
          }
        });
      }

    }

  });
}

fs.readFile( key_file, function( err, data ) {
  if ( err ) {
    throw err;
  }

  key = JSON.parse( data.toString() );
  key = key.key;

  push = new pushover( {
    token: key
  });

  for ( i = 0; i < l; i++ ) {
    var a = services[i];
    mon.create( 'http', a );
    mon.on( a.name, update );
  }

  mon.monitor();
});

