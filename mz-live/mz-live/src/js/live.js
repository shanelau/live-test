if (_get('play-button-color')) {
  var css = '.vjs-polyzor-skin .vjs-big-play-button {color: #' + _get('play-button-color') + ';top: ' + (_get('play-button-top') ? _get('play-button-top') : '50') + '%;}.vjs-polyzor-skin .vjs-big-play-button:hover {color: #' + _get('play-button-color') + ';}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}
var s = '<video id="my-video" class="video-js vjs-polyzor-skin" webkit-playsinline preload="auto" width="640" height="480" ' +
  'controls ' + (_get('poster') != null ? 'poster="' + _get('poster') + '" ' : '') + 'data-setup="">';

if (rtmp_url != null) s += '<source src="' + rtmp_url + '" type="rtmp/flv">';
if (hls_url != null) s += '<source src="' + hls_url + '" type="application/x-mpegURL">';
if (mp4_url != null) s += '<source src="' + mp4_url + '" type="video/mp4">';
if (webm_url != null) s += '<source src="' + webm_url + '" type="video/webm">';

s += '</video>';
document.getElementsByTagName('body')[0].innerHTML = s;

var sources = [
  {
    src: 'rtmp://bg-test-play.live.bigertech.com/test/live-360w',
    type: 'rtmp/flv',
    label: '360'
  },
  {
    src: 'rtmp://bg-test-play.live.bigertech.com/test/live-720w',
    type: 'rtmp/flv',
    label: '720'
  },
  {
    src: 'rtmp://bg-test-play.live.bigertech.com/test/live-1080w',
    type: 'rtmp/flv',
    label: '1080'
  }
];
var player = videojs("my-video",  {
    techOrder: ["html5", "flash"],
    autoplay: true,
    timeDivider: false,
    controlBar: {
      progressControl: false
    },
    plugins: {
      videoJsResolutionSwitcher: {
        default: 'high',
        dynamicLabel: true
      }
    }
  }, function () {
    player = this;
    // Add dynamically sources via updateSrc method
    player.updateSrc(sources);

    player.on('resolutionchange', function () {
      console.info('Source changed to %s', player.src())
    })

  }
);