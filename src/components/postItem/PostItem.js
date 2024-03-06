import React from "react";

const PostItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  
  return (
    <>
      <div className="border-solid border-2 border-white rounded-xl h-[400px]">
        <img
          src={
            !imageUrl
              ? "https://img.etimg.com/thumb/msid-95730715,width-1070,height-580,imgsize-54790,overlay-etmarkets/photo.jpg"
              : imageUrl
          }
          className="w-full h-[35%] rounded-xl"
          alt="..."
        />
        <div className="px-5">
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill text-[#e55454] "
            style={{ zIndex: "1", left: "90%" }}
          >
            {source}
            
          </span>
          <h5 className="text-white font-medium text-base">{title}</h5>
          <p className="text-white font-normal text-sm">{description}</p>
          <p className="text-white">
            <small className="text-muted">
              {" "}
              By {!author ? "unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer font-semibold text-white "
          >
            Read more
          </a>
        </div>
      </div>
    </>
  );
};

export default PostItem;
