import { Editor } from "@tinymce/tinymce-react";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../firebase/index";

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from "tinymce/tinymce";
// DOM model
import "tinymce/models/dom/model";
// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin.min.css";

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

// importing plugin resources
import "tinymce/plugins/emoticons/js/emojis";

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
import contentCss from "!!raw-loader!tinymce/skins/content/default/content.min.css";
import contentUiCss from "!!raw-loader!tinymce/skins/ui/oxide/content.min.css";
import { useRef, useState } from "react";

export default function BundledEditor({ setParagraph, paragraph }) {
  // note that skin and content_css is disabled to avoid the normal
  // loading process and is instead loaded as a string via content_style
  const editorRef = useRef(null);

  const [progress, setProgress] = useState(0);

  const handleEditorChange = (content, editor) => {
    // Split the content into paragraphs at each line break
    const paragraphsArray = content.split("\n");

    // Create an array of paragraph objects with text and image properties
    const formattedParagraphs = paragraphsArray.map((paragraph) => {
      if (paragraph.trim().startsWith("<p><img")) {
        return {
          text: "",
          image: paragraph.match(/src="([^"]+)"/)?.[1] || "",
        };
      } else {
        return {
          text: paragraph.trim(),
          image: "",
        };
      }
    });

    // Update the paragraphs state with the filtered paragraphs
    setParagraph(formattedParagraphs);
  };

  return (
    <div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          selector: "textarea",
          plugins: [
            "advlist",
            "anchor",
            "autolink",
            "help",
            "image",
            "link",
            "lists",
            "searchreplace",
            "table",
            "wordcount",
            "media",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | " +
            "image | link",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_picker_types: "image",
          file_picker_callback: function (callback, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = function () {
              var file = this.files[0];
              const fileName = new Date().getTime() + file.name;
              const storageRef = ref(storage, `/blogs/${fileName}`);
              const uploadTask = uploadBytesResumable(storageRef, file);

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  setProgress(Math.round(progress));
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                    default:
                      break;
                  }
                },
                (error) => {},
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      callback(downloadURL, { image: downloadURL });
                    }
                  );
                }
              );
            };

            input.click();
          },
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}
