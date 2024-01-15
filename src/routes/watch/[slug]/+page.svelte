<script lang="ts">
  import Plyr from "plyr";
  import Hls from "hls.js";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  onMount(() => {
    const source = `http://localhost/v1/storage/buckets/659e94dbafdb3408b18e/files/${$page.params.slug}_playlist.m3u8/view`;
    const defaultOptions: any = {};
    const video = document.querySelector("video") as HTMLVideoElement;

    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: (xhr, url) => {
          // console.log(url, xhr);
          if (!url.includes("/view")) {
            if (url.includes("storage/buckets/659e94dbafdb3408b18e/files")) {
              const q = url.split("/").pop();
              const murl =
                `http://localhost/v1/storage/buckets/659e94dbafdb3408b18e/files/${$page.params.slug}_` +
                q +
                "/view";
              xhr.open("GET", murl, true);
            }
          }
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("X-Appwrite-Response-Format", "1.4.0");
          xhr.setRequestHeader("X-Appwrite-Project", "659e93f20c42c09f4fa6");
        },
      });
      hls.loadSource(source);

      // From the m3u8 playlist, hls parses the manifest and returns
      // all available video qualities. This is important, in this approach,
      // we will have one source on the Plyr player.
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        // Transform available levels into an array of integers (height values).
        const availableQualities = hls.levels.map((l) => l.height);
        defaultOptions.controls = [
          "play-large", // The large play button in the center
          "rewind", // Rewind by the seek time (default 10 seconds)
          "play", // Play/pause playback
          "fast-forward", // Fast forward by the seek time (default 10 seconds)
          "progress", // The progress bar and scrubber for playback and buffering
          "current-time", // The current time of playback
          "duration", // The full duration of the media
          "mute", // Toggle mute
          "volume", // Volume control
          "settings", // Settings menu
          "fullscreen", // Toggle fullscreen
        ];

        // Add new qualities to option
        availableQualities.unshift(0); //prepend 0 to quality array
        defaultOptions.quality = {
          default: availableQualities[availableQualities.length - 1],
          options: availableQualities,
          // this ensures Plyr to use Hls to update quality level
          forced: true,
          onChange: (e: any) => updateQuality(e),
        };
        defaultOptions.i18n = {
          qualityLabel: {
            0: "Auto",
          },
        };
        hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
          var span = document.querySelector(
            ".plyr__menu__container [data-plyr='quality'][value='0'] span"
          ) as Element;
          if (hls.autoLevelEnabled) {
            span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
          } else {
            span.innerHTML = `AUTO`;
          }
        });

        // Initialize here
        new Plyr(video, defaultOptions);
      });
      hls.attachMedia(video);
      window.hls = hls;
    } else {
      // default options with no quality update in case Hls is not supported
      new Plyr(video, defaultOptions);
    }
  });

  function updateQuality(newQuality: any) {
    if (newQuality === 0) {
      window.hls.currentLevel = -1; //Enable AUTO quality if option.value = 0
    } else {
      window.hls.levels.forEach((level: { height: any }, levelIndex: any) => {
        if (level.height === newQuality) {
          console.log("Found quality match with " + newQuality);
          window.hls.currentLevel = levelIndex;
        }
      });
    }
  }
</script>

<div class="w-[800px]">
  <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
  <!-- svelte-ignore a11y-media-has-caption -->
  <video id="player"> </video>
</div>
