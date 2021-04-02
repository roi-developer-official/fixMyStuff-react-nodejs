import './post.css'
export default function Post() {
  const desc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, vel. this is addded words";
 
  function limitSentenceWords(num, sentence) {
    let words = sentence.split(" ");
    words.splice(num);
    words.push("...");

    console.log(words.join(""));
    return words.join(" ");
  }

  return (
    <div className="userp_post_container">
      <div className="userp_post">
        <div className="userp_td_image_wrapper">
          <img src="" alt="" />
        </div>
        <div className="userp_td_title">
          <p>Lorem, ipsum.</p>
        </div>
        <div className="userp_td_description">
          <p>{limitSentenceWords(5, desc)}</p>
        </div>
        <div className="userp_td_max_payment">
          <p>500 $</p>
        </div>
      </div>
      <button className="userp_post_details_btn">Details</button>
      <input type="checkbox" name="" id="" />
    </div>
  );
}
