import React, {useEffect, useLayoutEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {
  
  
   const [articles, setArticles] = useState([])
   const [loading, setLoading] = useState(false)
   const [page, setPage] = useState(1)
   const [totalResults, setTotalResults] = useState(0)
   const capitalText=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
  

  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json() 
    props.setProgress(70);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    
      props.setProgress(100);
  }
  

  useEffect(() => {
   document.title=`Hello-News: ${capitalText(props.category)}`;

    updateNews();
  },[]);
  // async componentDidMount(){
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=15696b3c40574d16a1a330e735abbf04&page=1&pageSize=${props.pageSize}`;
  //   // setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json() 
  //   // console.log(parsedData);
  //   // setState({
  //   //   articles: parsedData.articles, 
  //   //   totalResults: parsedData.totalResults,
  //   //   loading:false
  //   // })
  //   updateNews();
  //     }



  const handleNextClick = async()=>{
    // console.log("next")
    // if(!(state.page+1 > Math.ceil(state.totalResults/props.pageSize))){

    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=15696b3c40574d16a1a330e735abbf04&page=${state.page+1}&pageSize=${props.pageSize}`;
    //   setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json() 
      
    //   setState({
    //     page: state.page+1,
    //     articles: parsedData.articles,
    //     loading:false
    //   }) 
    // }
    setPage(page +1)
    updateNews();
 }
 const handlePreClick = async()=>{
  //  console.log("previous")

  //  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=15696b3c40574d16a1a330e735abbf04&page=${state.page-1}&pageSize=${props.pageSize}`;
  //  setState({loading:true}); 
  //  let data = await fetch(url);
  //   let parsedData = await data.json() 
  //   console.log(parsedData);
  //   setState({
  //     page: state.page-1,
  //     articles: parsedData.articles,
  //     loading:false
  //   })
  setPage(page -1)
  updateNews();
}

  const  fetchMoreData = async() => {
      
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json() 
      console.log(parsedData);
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      
    };


  
  return (
      <>
        <h1 className="text-center" style={{margin: "35px 0px", marginTop: "90px"}}>Hello-News: Top {capitalText(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4"  key={element.url}>
               <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-8">
        <button disabled={state.page<=1} type="button" className="btn btn-dark" onClick={handlePreClick}>&larr;Previous</button>
        <button disabled={state.page+1 > Math.ceil(state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next&rarr;</button>
        </div> */}
      </>
       
      
    )
  
}


News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News
