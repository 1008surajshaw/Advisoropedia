import signupImg from "../assets/signup-image.svg"
import Template from "../layout/Template"

export default function Signup ()  {
    return (
      <Template
      title="Join now"
      formType="signup"
      description1="We’re glad to see you. "
      description2="signup and start post  ."
      image={signupImg}
      >
  
      </Template>
    )
  }