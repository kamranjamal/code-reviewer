import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme for better syntax highlighting
import Markdown from "react-markdown";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";

function App() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");

  async function handleCode() {
    if(!code) return
    try {
      setLoading(true);

      const result = await axios.post("http://localhost:5000/generateReview", {
        prompt: code,
      });
      setReview(result.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-screen h-screen items-center gap-6 bg-[#121212] p-6">
      {/* Code Editor Section */}
      <div className="w-1/2 h-[90vh] bg-[#1e1e1e] border border-gray-700 overflow-auto text-gray-200 rounded-lg p-4 relative shadow-lg">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={12}
          style={{
            fontFamily: ' "monospace"',
            fontSize: 16,
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            borderRadius: "8px",
          }}
        />
        <button
          disabled={loading}
          className="sticky bg-blue-600 hover:bg-blue-500 transition-all right-4 bottom-0 px-4 py-2 rounded-md text-white font-semibold disabled:bg-gray-500"
          onClick={handleCode}
        >
          {loading ? "Generating..." : "Generate Review"}
        </button>
      </div>

      {/* Markdown Review Section */}
      <div className="w-1/2 h-[90vh] bg-[#222] border border-gray-700 text-gray-200 rounded-lg p-6 overflow-auto shadow-lg">
        <Markdown rehypePlugins={[rehypeHighlight]} className="prose prose-invert">
          {review || "🔍 Your code review will appear here..."}
        </Markdown>
      </div>
    </div>
  );
}

export default App;
