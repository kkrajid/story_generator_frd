import React, { useState, useEffect } from 'react';
import { PlusCircle, BookOpen, Users, Sparkles, Send, Loader2, Trash2, Eye, User, Scroll } from 'lucide-react';

const API_BASE_URL = 'https://backend.quirktale.xyz';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatingStoryFor, setGeneratingStoryFor] = useState(null);
  const [activeTab, setActiveTab] = useState('characters');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCharacter, setNewCharacter] = useState({ name: '', details: '' });
  const [storyRequest, setStoryRequest] = useState('');

  // Fetch characters on component mount
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/characters/`);
      if (response.ok) {
        const data = await response.json();
        setCharacters(data);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const createCharacter = async () => {
    if (!newCharacter.name.trim() || !newCharacter.details.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/characters/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCharacter),
      });

      if (response.ok) {
        const createdCharacter = await response.json();
        setCharacters([...characters, createdCharacter]);
        setNewCharacter({ name: '', details: '' });
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error creating character:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateStory = async (characterName) => {
    setGeneratingStoryFor(characterName);
    setStory(null);
    try {
      const response = await fetch(`${API_BASE_URL}/stories/generate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: characterName }),
      });

      if (response.ok) {
        const data = await response.json();
        setStory(data);
        setActiveTab('story');
      }
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setGeneratingStoryFor(null);
    }
  };

  const CharacterCard = ({ character }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{character.name}</h3>
              <p className="text-sm text-gray-500">Character ID: {character.id.slice(0, 8)}...</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCharacter(character)}
            className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {character.details.length > 120 
            ? `${character.details.slice(0, 120)}...` 
            : character.details}
        </p>
        
        <button
          onClick={() => generateStory(character.name)}
          disabled={generatingStoryFor === character.name}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {generatingStoryFor === character.name ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Story</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  const CreateCharacterForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create New Character</h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Character Name
              </label>
              <input
                type="text"
                value={newCharacter.name}
                onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter character name..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Character Details
              </label>
              <textarea
                value={newCharacter.details}
                onChange={(e) => setNewCharacter({ ...newCharacter, details: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-32 resize-none"
                placeholder="Describe your character's personality, background, appearance, etc..."
                required
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={createCharacter}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Create</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CharacterDetailModal = () => (
    selectedCharacter && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedCharacter.name}</h2>
                  <p className="text-sm text-gray-500">Character Details</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 leading-relaxed">{selectedCharacter.details}</p>
            </div>
            
            <button
              onClick={() => {
                generateStory(selectedCharacter.name);
                setSelectedCharacter(null);
              }}
              disabled={generatingStoryFor === selectedCharacter.name}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {generatingStoryFor === selectedCharacter.name ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Story</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Story Generator</h1>
                <p className="text-xs text-gray-500">Create characters & generate stories</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Character</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('characters')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'characters'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Characters ({characters.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'story'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Scroll className="w-4 h-4" />
                <span>Generated Story</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'characters' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Characters</h2>
              <p className="text-gray-600">Create and manage your story characters</p>
            </div>
            
            {characters.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No characters yet</h3>
                <p className="text-gray-400 mb-6">Create your first character to start generating stories</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center space-x-2 mx-auto"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Create First Character</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'story' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Generated Story</h2>
              <p className="text-gray-600">AI-generated story based on your character</p>
            </div>
            
            {generatingStoryFor ? (
              <div className="text-center py-16">
                <Loader2 className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Generating story for {generatingStoryFor}...</h3>
                <p className="text-gray-500">This may take a few moments</p>
              </div>
            ) : story ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Story: {story.character_name}</h3>
                  <p className="text-purple-100">Word count: {story.word_count} words</p>
                </div>
                <div className="p-8">
                  <div className="prose prose-lg max-w-none">
                    {story.story.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph.trim()}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Scroll className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No story generated yet</h3>
                <p className="text-gray-400 mb-6">Select a character to generate an AI-powered story</p>
                <button
                  onClick={() => setActiveTab('characters')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center space-x-2 mx-auto"
                >
                  <Users className="w-5 h-5" />
                  <span>View Characters</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showCreateForm && <CreateCharacterForm />}
      <CharacterDetailModal />
    </div>
  );
};

export default App;