import { ChangeEvent, useContext } from "react";
import { RenderContext } from "./page";
import { BgImage } from "./customClasses";

function BgLoadBtn() {
  const context = useContext(RenderContext);

  function handleFileRead(
    e: ProgressEvent<FileReader>,
    readFiles: BgImage[],
    fileName: string,
    fileSize: number,
    fileLastModified: number
  ) {
    const result: string | undefined = (
      e.currentTarget as FileReader
    ).result?.toString();

    if (result) {
      readFiles.push(new BgImage(result, fileName, fileSize, fileLastModified));
    }

    context.setValues({
      ...context.values,
      bgImages: readFiles,
      imageIndex: 0,
    });
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    let files: FileList | null = e.target.files;

    if (!files) {
      alert("Please, select a file...");
      return;
    } else {
      const readFiles: BgImage[] = [];

      for (let f of files) {
        let reader = new FileReader();
        reader.onload = (e) =>
          handleFileRead(e, readFiles, f.name, f.size, f.lastModified);
        reader.readAsDataURL(f);
      }
    }
  }

  return (
    <tr>
      <td>
        <label htmlFor="bg-files-input" className="place-content-center">
          Select background file:
        </label>
      </td>
      <td>
        <input
          onChange={handleFileSelect}
          type="file"
          id="bg-files-input"
          multiple={true}
          accept="image/png, image/jpeg"
        />
      </td>
    </tr>
  );
}

export default BgLoadBtn;
