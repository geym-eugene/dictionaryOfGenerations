import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <div className="error-container">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCb5Ofin4hbfyYD3KdlTrVRekVKuAijAKBlg&s" 
        alt="Фон ошибки" 
        className="error-image"
      />
      
      <div className="error-content">
        <h1 className="error-title">хаха лол ну ты раздал свэга</h1>
        <p className="error-message">
          возвращайся на главную, тут живет error404
        </p>
        
        <div className="error-buttons">
          <button
            className="error-button secondary-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
             let's gooo00ooo0o0 сюда блин -__- 
          </button>
        </div>
      </div>
    </div>
  )}