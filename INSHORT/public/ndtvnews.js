document.getElementById('aiimage').addEventListener('click', function() {
    var modal = document.getElementById('shortContainer');
    modal.style.display = 'flex'; // Show the modal
});

window.addEventListener('click', function(event) {
    var modal = document.getElementById('shortContainer');
    if (event.target == modal) {
        modal.style.display = 'none'; // Hide the modal when clicking outside the content
    }
});

function createCards(data){
    for(let i=0;i<50;i++){
        console.log(data[i]);
        let shortContainer=document.getElementById('modal-content');
        let newsCard=document.createElement('div');
        newsCard.className='news-card';
        let newsImage=document.createElement('div');
        newsImage.className='news-image';
        newsImage.style.backgroundImage=`url(${data[i].image_url})`;
        newsImage.style.margin='10px';

       let likeContainer=document.createElement('div');
       likeContainer.className='likeContainer';
       let likeImage=document.createElement('img');
       likeImage.className='likeImage';
       likeImage.src='whiteLike.png';
        let publishedDate=document.createElement('p');
        publishedDate.textContent=data[i].published.split('T')[0];
        publishedDate.style.marginRight='20px';
        likeContainer.appendChild(likeImage);
        likeContainer.appendChild(publishedDate);

        let newsContent=document.createElement('div');
        newsContent.className='news-content';
        let newsHeadline=document.createElement('p');
        newsHeadline.className='news-headline';
        newsHeadline.style.margin='10px';
        newsHeadline.style.fontSize='30px';
        newsHeadline.style.fontWeight='bold';
        newsHeadline.textContent=data[i].title;
        let newsData=document.createElement('p');
        newsData.className='news-data';
        newsData.style.fontSize='18px';
        newsData.style.margin='10px';
        newsData.textContent=data[i].summary;
        newsCard.style.marginBottom='10px';
        newsContent.appendChild(newsHeadline);
        newsContent.appendChild(newsData);
        newsCard.appendChild(newsImage);
        newsCard.appendChild(likeContainer);
        newsCard.appendChild(newsContent);
        shortContainer.appendChild(newsCard);
        likeImage.addEventListener('click',()=>{
            let imageSrc=likeImage.src.split('/').pop();
            if(imageSrc=='whiteLike.png'){
                likeImage.src='redLike.png';
            }
            else{
                likeImage.src='whiteLike.png';
            }
        });
    }
}
window.onload=function(){
    console.log('page loaded');
    fetch('/news',{
        method:'GET',
        headers:{'Content-Type':'application/json'}
    }).then(resp=>{
        if(!resp.ok){
            console.error(`HTTP error: ${resp.status} ${resp.statusText}`);
            throw new Error('response is not ok');
        }
        return resp.json();
    }).then(dataValues=>{
        createCards(dataValues.data);
    }).catch(err=>{
        throw new Error(err);
    });
}