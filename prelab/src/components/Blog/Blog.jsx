import Bloggy from "./Bloggy";
import Left from "./Left";


function Blog() {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-8 col-md-8">
                    <Bloggy/>
                </div>
                <div className=" col-4 col-md-4">
                    <Left/>
                </div>
            </div>
        </div>
    )
}
export default Blog