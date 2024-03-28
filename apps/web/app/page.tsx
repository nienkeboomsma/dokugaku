export default function Page(): JSX.Element {
  return (
    <>
      <form
        action={`http://localhost:${process.env.WORK_PROCESSOR_PORT}/processManga`}
        method='post'
        encType='multipart/form-data'
      >
        <h1>Process manga</h1>
        <label htmlFor='Series'>Series</label>
        <input id='Series' type='text' name='Series'></input>
        <label htmlFor='volume'>Volume</label>
        <input id='volume' type='number' name='volume'></input>
        <label htmlFor='title'>Title</label>
        <input id='title' type='text' name='title'></input>
        <label htmlFor='author'>Author</label>
        <input id='author' type='text' name='author'></input>
        <label htmlFor='mokuro'>Already mokuro'd?</label>
        <input id='mokuro' type='checkbox' name='mokuro'></input>
        <label htmlFor=''>Files </label>
        <input
          id='files'
          type='file'
          multiple
          name='files'
          accept='.png, .jpg, .jpeg, .json'
        ></input>
        <button>Submit</button>
      </form>
      <form
        action={`http://localhost:${process.env.WORK_PROCESSOR_PORT}/processNovel`}
        method='post'
        encType='multipart/form-data'
      >
        <h1>Process novel</h1>
        <label htmlFor='series'>Series</label>
        <input id='series' type='text' name='series'></input>
        <label htmlFor='volume'>Volume</label>
        <input id='volume' type='number' name='volume'></input>
        <label htmlFor='title'>Title</label>
        <input id='title' type='text' name='title'></input>
        <label htmlFor='author'>Author</label>
        <input id='author' type='text' name='author'></input>
        <label htmlFor='cover'>Cover</label>
        <input
          id='cover'
          type='file'
          name='cover'
          accept='.png, .jpg, .jpeg'
        ></input>
        <label htmlFor='files'>Files</label>
        <input
          type='file'
          id='files'
          multiple
          name='files'
          accept='.html, .md, .txt'
        ></input>
        <button>Submit</button>
      </form>
    </>
  )
}
