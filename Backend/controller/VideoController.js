import {getVideoDetails} from "../Calculation/VideoData.js"

export const CompareVideo=async(req,res)=>{
    
    try {
           
      const {urlID1,urlID2}=req.body;

      console.log(urlID1);
      console.log(urlID2 );
    
        const video_1_Result= await getVideoDetails(urlID1,process.env.API_KEY_YT);
        const video_2_Result= await getVideoDetails(urlID2,process.env.API_KEY_YT);

        console.log(video_1_Result);
      
        const getScore=scoreVideos(video_1_Result,video_2_Result);    
        console.log(getScore);
         return res.status(201).json({
            message:"successfully Compare video ",
            success:true,
            getScore,
        });
        
    } catch (error) {
        return res.status(401).json({
            message:"Failed To Compare Video.... ",
            success:false,
        });
        
    }
   
} 


function scoreVideos(videoA, videoB) {
    let scoreA = 0;
    let scoreB = 0;
  
    // 1. Likes
    if (videoA.likes > videoB.likes) scoreA++;
    else if (videoB.likes > videoA.likes) scoreB++;
  
    // 2. Views
    if (videoA.views > videoB.views) scoreA++;
    else if (videoB.views > videoA.views) scoreB++;
  
    // 3. Comments
    if (videoA.comments > videoB.comments) scoreA++;
    else if (videoB.comments > videoA.comments) scoreB++;
  
    // 4. Like-to-View Ratio
    const ratioA = videoA.likes / videoA.views;
    const ratioB = videoB.likes / videoB.views;
    if (ratioA > ratioB) scoreA++;
    else if (ratioB > ratioA) scoreB++;



  
    // 5. Upload Date (newer is better)
    const dateA = new Date(videoA.uploadDate);
    const dateB = new Date(videoB.uploadDate);
    if (dateA > dateB) scoreA++;
    else if (dateB > dateA) scoreB++;

    
    // 6. Comment-To-View Ratio
    const commentRatioA = videoA.comments / videoA.views;
    const commentRatioB = videoB.comments / videoB.views;
    if (commentRatioA > commentRatioB) scoreA++;
    else if (commentRatioB > commentRatioA) scoreB++;


    // 7. Engagement Checking 
    const Engagement_A = videoA.likes + videoA.comments;
    const Engagement_B = videoB.likes + videoB.comments;
    if (Engagement_A > Engagement_B) scoreA++;
    else if (Engagement_B > Engagement_A) scoreB++;
    
  
    return {
      videoA_score: scoreA,
      videoB_score: scoreB
    };
  }