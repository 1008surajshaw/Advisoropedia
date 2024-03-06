import loginImg from "../assets/signin-image.svg"
import Template from "../layout/Template"


export default function Login ()  {
    return (
      <Template
      title="welcome back"
      formType="login"
      description1="We’re glad to see you again ."
      description2="login to add new post ."
      image={loginImg}
      >
  
      </Template>
    )
  }
  