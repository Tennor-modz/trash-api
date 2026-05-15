const axios = require('axios')

async function dictionary(word) {
  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
  )

  const entry = data[0]

  // get audio pronunciation (first non-empty)
  const audio = entry.phonetics?.find(p => p.audio)?.audio || null
  const phonetic = entry.phonetics?.find(p => p.text)?.text || null

  // extract all meanings cleanly
  const meanings = entry.meanings.map(m => ({
    part_of_speech: m.partOfSpeech,
    definitions: m.definitions.slice(0, 3).map(d => ({
      definition: d.definition,
      example:    d.example || null
    })),
    synonyms: m.synonyms.slice(0, 5),
    antonyms: m.antonyms.slice(0, 5)
  }))

  return {
    word:     entry.word,
    phonetic,
    audio,
    meanings,
    source:   entry.sourceUrls?.[0] || null
  }
}

module.exports = { dictionary }