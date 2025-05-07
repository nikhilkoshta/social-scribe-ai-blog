
import { useEffect, useRef, useState } from 'react';

interface TextEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextEditor({ initialValue = '', onChange, placeholder = 'Start writing...' }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  
  // Initialize the editor with initial content
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.innerHTML = initialValue || '';
      
      // Focus the editor
      if (!initialValue) {
        setTimeout(() => {
          editor.focus();
        }, 100);
      }
    }
  }, [initialValue]);
  
  // Listen for content changes and propagate them
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    
    const handleInput = () => {
      onChange(editor.innerHTML);
    };
    
    editor.addEventListener('input', handleInput);
    return () => {
      editor.removeEventListener('input', handleInput);
    };
  }, [onChange]);
  
  // Handle keyboard shortcuts for formatting
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            document.execCommand('bold', false);
            break;
          case 'i':
            e.preventDefault();
            document.execCommand('italic', false);
            break;
          case 'u':
            e.preventDefault();
            document.execCommand('underline', false);
            break;
        }
      }
    };
    
    editor.addEventListener('keydown', handleKeyDown);
    return () => {
      editor.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const formatText = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };
  
  const handleHeading = (level: number) => {
    formatText('formatBlock', `<h${level}>`);
  };
  
  return (
    <div className="border rounded-md overflow-hidden">
      <div className={`bg-muted/50 p-2 border-b flex items-center overflow-x-auto transition-opacity ${isToolbarVisible ? 'opacity-100' : 'opacity-80'}`}>
        <div className="flex items-center space-x-1">
          <button 
            className="p-1.5 rounded hover:bg-muted" 
            onClick={() => handleHeading(1)}
            title="Heading 1"
          >
            <span className="font-bold text-sm">H1</span>
          </button>
          <button 
            className="p-1.5 rounded hover:bg-muted" 
            onClick={() => handleHeading(2)}
            title="Heading 2"
          >
            <span className="font-bold text-sm">H2</span>
          </button>
          <button 
            className="p-1.5 rounded hover:bg-muted" 
            onClick={() => handleHeading(3)}
            title="Heading 3"
          >
            <span className="font-bold text-sm">H3</span>
          </button>
          
          <div className="w-px h-6 bg-border mx-1"></div>
          
          <button 
            className="p-1.5 rounded hover:bg-muted" 
            onClick={() => formatText('bold')}
            title="Bold"
          >
            <span className="font-bold text-sm">B</span>
          </button>
          <button 
            className="p-1.5 rounded hover:bg-muted" 
            onClick={() => formatText('italic')}
            title="Italic"
          >
            <span className="italic text-sm">I</span>
          </button>
          <button 
            className="p-1.5 rounded hover:bg-muted" 
            onClick={() => formatText('underline')}
            title="Underline"
          >
            <span className="underline text-sm">U</span>
          </button>
          
          <div className="w-px h-6 bg-border mx-1"></div>
          
          <button 
            className="p-1.5 rounded hover:bg-muted" 
            onClick={() => formatText('insertUnorderedList')}
            title="Bullet List"
          >
            • List
          </button>
          <button 
            className="p-1.5 rounded hover:bg-muted" 
            onClick={() => formatText('insertOrderedList')}
            title="Numbered List"
          >
            1. List
          </button>
          
          <div className="w-px h-6 bg-border mx-1"></div>
          
          <button 
            className="p-1.5 rounded hover:bg-muted" 
            onClick={() => {
              const url = prompt('Enter link URL:');
              if (url) formatText('createLink', url);
            }}
            title="Insert Link"
          >
            Link
          </button>
        </div>
      </div>
      
      <div
        ref={editorRef}
        className="min-h-[400px] p-4 outline-none prose prose-sm dark:prose-invert max-w-none"
        contentEditable
        onFocus={() => setIsToolbarVisible(true)}
        onBlur={() => setIsToolbarVisible(false)}
        data-placeholder={placeholder}
        style={{ wordBreak: 'break-word' }}
      />
    </div>
  );
}
