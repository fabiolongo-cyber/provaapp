import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';

const SERVER = 'https://example-server-placeholder.invalid'; // Sostituisci con l'URL pubblico del server di estrazione quando lo avrai

function FeedScreen({ onOpen }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    // Esempio demo: due feed pubblici
    const feeds = [
      'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
      'https://www.repubblica.it/rss/homepage/rss2.0.xml'
    ];
    (async () => {
      try {
        const demo = feeds.map((f, i) => ({
          title: `Esempio articoli da feed ${i+1}`,
          link: `https://example.com/article-${i+1}`,
          pubDate: new Date().toISOString(),
          source: f,
          snippet: 'Questo è un contenuto dimostrativo. Collega il server per vedere estrazioni reali.'
        }));
        setItems(demo);
      } catch (e) {
        console.warn(e.message);
        setItems([]);
      }
    })();
  }, []);

  if (!items) return <ActivityIndicator style={{flex:1}}/>;

  return (
    <SafeAreaView style={{flex:1}}>
      <FlatList
        data={items}
        keyExtractor={(i,idx)=>i.link + idx}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=> onOpen(item.link)} style={{padding:12, borderBottomWidth:1, borderColor:'#eee'}}>
            <Text style={{fontWeight:'bold'}}>{item.title}</Text>
            <Text numberOfLines={2} style={{color:'#666'}}>{item.snippet}</Text>
            <Text style={{color:'#999', fontSize:12}}>{item.source} • {item.pubDate}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export default function App() {
  const [viewUrl, setViewUrl] = useState(null);
  const [articleHtml, setArticleHtml] = useState(null);
  const [loading, setLoading] = useState(false);

  async function openArticle(url) {
    setLoading(true);
    setViewUrl(url);
    try {
      const html = `<html><body><h1>Titolo demo</h1><p>Contenuto demo per il link: ${url}</p><hr/><p>Fonte originale: <a href="${url}">${url}</a></p></body></html>`;
      setArticleHtml(html);
    } catch (e) {
      console.warn('extract failed', e.message);
      setArticleHtml(`<html><body><p>Impossibile estrarre l'articolo.</p><p><a href="${url}">Apri sorgente</a></p></body></html>`);
    } finally {
      setLoading(false);
    }
  }

  if (viewUrl && articleHtml) {
    return (
      <SafeAreaView style={{flex:1}}>
        <TouchableOpacity onPress={()=>{ setViewUrl(null); setArticleHtml(null); }} style={{padding:10, backgroundColor:'#eee'}}>
          <Text>← Torna al feed</Text>
        </TouchableOpacity>
        <WebView style={{flex:1}} originWhitelist={['*']} source={{ html: articleHtml }} />
      </SafeAreaView>
    );
  }

  return <FeedScreen onOpen={openArticle} />;
}
