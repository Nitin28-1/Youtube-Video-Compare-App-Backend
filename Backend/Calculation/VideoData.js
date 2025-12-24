import  { google } from 'googleapis';
const youtube = google.youtube('v3');

export const getVideoDetails=async(videoId, apiKey)=> {
   
  try{
    const res =await youtube.videos.list({
      key: apiKey,
      part: 'snippet,statistics',
      id: videoId
    });
  
    const video =await res.data.items[0];
  
    return {
      title: video.snippet.title,
      uploadDate: video.snippet.publishedAt,
      likes: parseInt(video.statistics.likeCount),
      views: parseInt(video.statistics.viewCount),
      comments: parseInt(video.statistics.commentCount),
      success:true,
  }
   
  }
  catch(e){
    return {
      success:false
    }
  }
}