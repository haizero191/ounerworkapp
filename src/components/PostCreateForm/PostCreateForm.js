import React, { useEffect, useState } from "react";
import "./PostCreateForm.scss";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { encryptHTML } from "../../utils/Crypto";
import { apiCaller, endpoints } from "../../configs/APIs";
import cookie from "react-cookies"



const PostCreateForm = () => {
  const [files, setFiles] = useState([]);
  const [htmlContentEncoded, setHtmlContentEncoded] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(htmlContentEncoded);
  }, [htmlContentEncoded]);

  useState(() => {
    console.log(images);
  }, [images]);

  /* Listen Editor changed */
  const onEditorStateChange = (editorState) => {
    const htmlContent = stateToHTML(editorState.getCurrentContent());
    setHtmlContentEncoded(encryptHTML(htmlContent));
  };

  /* Send request */
  const createPost = async () => {
    // Tạo một đối tượng FormData
    const formData = new FormData();
    // Thêm các tệp tin vào FormData
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
    // Thêm nội dung vào FormData
    formData.append("content", htmlContentEncoded);

    const token = cookie.load("access-token")
    ? cookie.load("access-token")
    : null;

    var api = apiCaller(endpoints["posts_create"], {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      }
    })

    
    var response = await api.post(formData);


    console.log(response)

    // // Gửi yêu cầu POST
    // return axios
    //   .post(url, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) => {
    //     // Xử lý kết quả thành công
    //     console.log("Success:", response.data);
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     // Xử lý lỗi
    //     console.error("Error:", error);
    //     throw error;
    //   });
  };

  /* Listen Files Selected */
  const onFileSelected = (event) => {
    setFiles(event.target.files);
    const imageUrls = [];

    // Read file
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        imageUrls.push(reader.result);

        if (imageUrls.length === event.target.files.length) {
          setImages(imageUrls); // Cập nhật state với danh sách URL hình ảnh
        }
      };

      reader.readAsDataURL(file);
    }
  };

  /* Open file explorer */
  const onFileUpload = () => {
    var input = document.getElementById("file-input");
    input.click();
  };

  return (
    <div className="PostCreateForm">
      <div className="post-create_container">

        <div className="title">
          <h3>Tạo bài viết mới</h3>
          <p>
            Tạo bài viết với hình ảnh đi kèm sẽ khiến bài viết của bạn trở nên
            thú vị và sinh động hơn đó :3
          </p>
        </div>
        <div className="post-create_form">
          {/* IMAGE UPLOAD AREA */}
          <div className="post-create_form-upload">
            <h5>Hình ảnh</h5>
            <div className="upload-container">
              <div className="upload-box" onClick={onFileUpload}>
                <i class="bi bi-plus"></i>
                <input
                  id="file-input"
                  type="file"
                  name="files"
                  multiple
                  onChange={onFileSelected}
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    opacity: 0,
                    height: "1px",
                    width: "1px",
                  }}
                />
              </div>
              {images.map((img, index) => {
                return (
                  <div className="upload-item">
                    <img key={index} src={img} alt={`preview-${index}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONTENT EDITOR AREA */}
          <div className="post-create_form-content">
            <h5>Nội dung </h5>
            <div className="content-container">
              <div className="content-editor">
                {/* <RichEditor /> */}
                <Editor
                  // editorState={editorValue}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  placeholder="Write something about this post"
                  onEditorStateChange={onEditorStateChange}
                />
                {/* <ControlledEditor  editorState={something}/> */}
              </div>
            </div>
          </div>
        </div>
        <div className="save" onClick={createPost}>
          <i class="bi bi-arrow-right-short"></i>
          <span>Đăng tin</span>
        </div>
      </div>
    </div>
  );
};

export default PostCreateForm;
