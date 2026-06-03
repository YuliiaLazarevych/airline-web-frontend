import React from 'react';

export default function Home() {
    return (
        <main className="container">
            <section className="hero-card">
                <h1>Bayraktar Air</h1>
                <p>
                    Ваш надійний крилатий партнер. Керуйте польотами, персоналом та даними
                    в один клік.
                </p>
            </section>

            <section className="features-main">
                <div className="feature-card">
                    <div className="icon">✈️</div>
                    <h3>Сучасний флот</h3>
                    <p>
                        Використовуємо лише новітні літаки з високою енергоефективністю та
                        комфортом.
                    </p>
                </div>
                <div className="feature-card">
                    <div className="icon">🛡️</div>
                    <h3>Безпека понад усе</h3>
                    <p>Багаторівневий контроль технічного стану перед кожним вильотом.</p>
                </div>
                <div className="feature-card">
                    <div className="icon">🌍</div>
                    <h3>Глобальна мережа</h3>
                    <p>
                        Понад 50 напрямків по всій Європі та світу для вашої свободи
                        пересувань.
                    </p>
                </div>
            </section>
        </main>
    );
}
