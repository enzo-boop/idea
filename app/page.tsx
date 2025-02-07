"use client";
import { useEffect, useState } from "react";
import { Post } from "./globals/models/models";
import { getPosts, postPost } from "@/client-services/post-service";

export default function Home() {
  const [posts, setPosts] = useState<Array<Post> | null>(null);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <div className="prose dark:prose-invert">
      {posts?.map((res, index) => (
        <div className="mt-4">
          <div key={index} className="post">
            <h3>
              <i className="fa fa-diamond mr-1"></i>
              {res.author}
            </h3>
            <img src={res.image_url} alt="post" />
            <p>{res?.text}</p>
            <p className="creation_date mb-0">Data creazione</p>
            <p className="align-text-end">
              {new Date(res?.created_at ?? "").toDateString()}
            </p>
          </div>
        </div>
      ))}
      {/* <div className="mt-4">
        <h3>
          <i className="fa fa-diamond mr-1"></i>
          Esplora il Movimento, Risveglia la Consapevolezza
        </h3>
        <p>
          La danza somatica è un viaggio interiore attraverso il movimento
          consapevole. Qui troverai articoli, esperienze e pratiche per
          riconnetterti con il tuo corpo e la tua espressivit&agrave;.
        </p>
        <img src="/img-1.jpg"></img>
      </div>
      <div className="mt-4">
        <h3>
          <i className="fa fa-book mr-1"></i>
          Cos&apos;è?
        </h3>
        <p>
          La danza somatica non si concentra sulla perfezione tecnica, ma sulla
          connessione con il corpo e con il momento presente. Ogni movimento
          &egrave; un&apos;espressione personale, un&apos;opportunit&agrave; per
          esplorare, sentire e capire meglio se stessi. &Egrave; un viaggio che
          stimola la percezione, promuove il benessere e aiuta a liberarsi dalle
          rigidit&agrave; fisiche ed emotive.
        </p>
        <img src="/img-2.jpg"></img>
      </div>
      <div className="mt-4">
        <h3>
          <i className="fa fa-bookmark-o mr-1"></i>
          Perch&eacute; Provarla?
        </h3>
        <p>
          Se stai cercando un&apos;esperienza che vada oltre la danza
          tradizionale, che ti aiuti a sentirti pi&ugrave; radicato nel tuo
          corpo e a vivere il movimento come una forma di cura, la danza
          somatica &egrave; la pratica che fa per te. Prenota una sessione e
          inizia il tuo viaggio nel corpo consapevole.
        </p>
        <img src="/img-3.jpg"></img>
      </div>
      <div className="mt-4">
        <h3>
          <i className="fa fa-heart mr-1"></i>
          Benefici
        </h3>
        <p>
          Riconnessione con il corpo: Risveglia la consapevolezza corporea e
          l&apos;autoefficacia. Liberazione dalle tensioni: Aiuta a rilasciare
          stress e blocchi emotivi attraverso il movimento. Crescita emotiva:
          Favorisce l&apos;espressione autentica e l&apos;integrazione emotiva.
          Benessere generale: Migliora la postura, l&apos;equilibrio e la
          coordinazione, aumentando la vitalit&agrave; e l&apos;energia.
        </p>
        <img src="/img-4.jpg"></img>
      </div> */}
      {/* <div className="mt-4">
        <h3>
          <i className="fa fa-calendar mr-1"></i>
          Appuntamenti
        </h3>
      </div> */}
    </div>
  );
}
