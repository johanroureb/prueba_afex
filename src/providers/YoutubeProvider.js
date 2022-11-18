import config from "../config";
import axios from "axios";
class YoutubeProvider {
  constructor(key) {
    this.key = key;
  }

  getVideo(id) {
    return new Promise((resolve, reject) => {
      let videoData = { status: 0, data: {} };
      let URL =
        "https://www.googleapis.com/youtube/v3/videos?id=" +
        id +
        "&key=" +
        this.key +
        "&part=snippet,contentDetails";
      axios.get(URL).then(
        (response) => {
          videoData.status = 1;
          if (response?.data?.items?.length == 1) {
            videoData.data = response?.data?.items[0];
            resolve(videoData);
          }
        },
        (err) => {
          console.log(err);
          reject("http-error");
        }
      );
    });
  }
}
export default new YoutubeProvider(config.youtubeKey);
