import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { storage } from '../../firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Bloggy(){
    //blog display
    const [blog, setBlog] =useState([]);

    //defining states
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] =useState("");
    const [image, setImage] = useState(null);

    //id of blog being edited
    const [editingId, setEditingId] = useState(null);
    //blog being edited
    const [editingBlog, setEditingBlog] = useState(null);

    //get blog item from firestore
    const blogCollectionRef = collection(db, "blog")

     //New blog Submission
     const onSubmit = async () => {
        if (image == null) return; // Exit if no image is selected
      
        try {
          const storageRef = ref(storage, `blogImages/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);
      
          uploadTask.on(
            (error) => {
              console.error("Error uploading image", error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImage(downloadURL);
      
                addDoc(blogCollectionRef, {
                  Title: newTitle,
                  Content: newContent,
                  ImageUrl: downloadURL,
                }).then(() => {
                  // Update the 'blog' state with the new blog document
                  setBlog((prevBlogs) => [...prevBlogs, { Title: newTitle, Content: newContent, ImageUrl: downloadURL }]);
                });
              });
            }
          );
        } catch (error) {
          console.error(error);
        }
      };
      //edit the blog
      const editBlog = async (id, title, content, image) => {
        if (image == null) return; // Exit if no image is selected
      
        try {
          const storageRef = ref(storage, `blogImages/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);
      
          uploadTask.on(
            (error) => {
              console.error("Error uploading image", error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImage(downloadURL);
      
                const blogRef = doc(db, "blog", id);
                updateDoc(blogRef, {
                  Title: title,
                  Content: content,
                  ImageUrl: downloadURL,
                }).then(() => {
                  // Update the 'blog' state with the edited blog document
                  setBlog((prevBlogs) =>
                    prevBlogs.map((blog) => (blog.id === id ? { ...blog, Title: title, Content: content, ImageUrl: downloadURL } : blog))
                  );
                  setEditingId(null);
                  setEditingBlog(null);
                });
              });
            }
          );
        } catch (error) {
          console.error(error);
        }
      };

      //delete blog
      const deleteBlog = async (id)=>{
        const blogDoc = doc(db, 'blog', id);
        await deleteDoc(blogDoc);
        setBlog((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      }

  //render the blogs to the screen
  useEffect(() => {
    const getBlogs = async () => {
      const data = await getDocs(blogCollectionRef);
      setBlog(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBlogs();
  }, []);
   


return (
    <div>
      {editingId === null ? (
       
         <form>
             {/* regular form */}
  <div class="mb-3">
    <label for="exampleInputTitle" class="form-label">New Blog post title</label>
    <input
      type="text"
      class="form-control"
      id="exampleInputTitle"
      aria-describedby="titleHelp"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
    />
    <div id="titleHelp" class="form-text">
      Got a new post, spill the title <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} className="google-icon" />
    </div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">content</label>
    <textarea
      type="text"
      class="form-control"
      id="exampleInputPassword1"
      value={newContent}
      onChange={(e) => setNewContent(e.target.value)}
    />
  </div>
  <div class="mb-3">
    <label for="img" class="form-label">image</label>
    <input type="file" class="form-control" id="img" onChange={(e) => setImage(e.target.files[0])} />
  </div>
  <button type="button" class="btn btn-primary" onClick={onSubmit}>
    Submit
  </button>
</form>
     
      ) : (
        /* edit form*/
        <form>
         
          <div class="mb-3">
            <label for="exampleInputTitle" class="form-label">Edit Blog post title</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputTitle"
              aria-describedby="titleHelp"
              value={editingBlog?.Title}
              onChange={(e) =>
                setEditingBlog((prevBlog) => ({ ...prevBlog, Title: e.target.value }))
              }
            />
            <div id="titleHelp" class="form-text">
              Edit the title <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} className="google-icon" />
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">content</label>
            <textarea
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              value={editingBlog?.Content}
              onChange={(e) =>
                setEditingBlog((prevBlog) => ({ ...prevBlog, Content: e.target.value }))
              }
            />
          </div>
          <div class="mb-3">
            <label for="img" class="form-label">image</label>
            <input type="file" class="form-control" id="img" onChange={(e) => setEditingBlog((prevBlog) => ({ ...prevBlog, Image: e.target.files[0] }))} />
          </div>
          <button type="button" class="btn btn-primary" onClick={() => editBlog(editingId, editingBlog.Title, editingBlog.Content, editingBlog.Image)}>
            Save Changes
          </button>
        </form>
      )}
      {blog.map((blog, index) => (
        <div className="card mb-3 mt-5" style={{ maxWidth: "540px" }} key={blog.id}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={blog.ImageUrl} class="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{blog.Title}</h5>
                <p className="card-text">{blog.Content}</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
          <div className='m-3'>
            <button type="button" className="btn btn-primary me-5 " onClick={() => { setEditingId(blog.id); setEditingBlog({ Title: blog.Title, Content: blog.Content, Image: null }); }}>
            Edit
          </button>
          <button type='button'className='btn btn-danger  ' onClick={()=>deleteBlog(blog.id)}>
            Delete post
          </button>
          </div>
        </div>
      ))}
    </div>
  );
    
}
export default Bloggy