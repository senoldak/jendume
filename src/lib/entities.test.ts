import test from 'node:test';
import assert from 'node:assert/strict';
import { matchEntities, findEntities, AI_ENTITIES } from './entities.ts';

test('AI entities dictionary has correct Wikidata links and types', () => {
  assert.equal(AI_ENTITIES.length, 8);
  const openAi = AI_ENTITIES.find((e) => e.keywords.includes('OpenAI'));
  assert.ok(openAi);
  assert.equal(openAi.sameAs, 'https://www.wikidata.org/wiki/Q21708200');
  assert.equal(openAi.type, 'Organization');

  const agi = AI_ENTITIES.find((e) => e.keywords.includes('AGI'));
  assert.ok(agi);
  assert.equal(agi.sameAs, 'https://www.wikidata.org/wiki/Q2264109');
  assert.equal(agi.type, 'Thing');
});

test('Short acronyms match isolated words and apostrophe suffixes', () => {
  const trMatches = matchEntities('OpenAI, yeni AGI hedefini ve yol haritasını paylaştı.', 'tr');
  const names = trMatches.map((m) => m.name);
  assert.ok(names.includes('OpenAI'));
  assert.ok(names.includes('Yapay Genel Zekâ'));

  const suffixMatches = matchEntities("Araştırmacılar AGI'ye giden yolda LLM'lerin rolünü tartışıyor.", 'tr');
  const suffixNames = suffixMatches.map((m) => m.name);
  assert.ok(suffixNames.includes('Yapay Genel Zekâ'));
  assert.ok(suffixNames.includes('Büyük Dil Modeli'));
});

test('False-positive substrings are NOT matched for short acronyms', () => {
  // "email", "chain", "aging", "claim" should not trigger AI or AGI
  const text = 'Please send an email to the marketing department regarding aging demographics and supply chain issues.';
  const matches = matchEntities(text, 'en');
  const names = matches.map((m) => m.name);
  assert.ok(!names.includes('Artificial Intelligence'));
  assert.ok(!names.includes('Artificial General Intelligence'));
  assert.equal(matches.length, 0);
});

test('Frontier tech entities match properly in both Turkish and English', () => {
  const trQuantum = matchEntities('Yeni kuantum hesaplama çipi laboratuvarda test edildi.', 'tr');
  assert.equal(trQuantum[0]?.name, 'Kuantum Hesaplama');
  assert.equal(trQuantum[0]?.sameAs, 'https://www.wikidata.org/wiki/Q17995793');

  const enQuantum = matchEntities('Researchers announced a breakthrough in quantum computing hardware.', 'en');
  assert.equal(enQuantum[0]?.name, 'Quantum Computing');
  assert.equal(enQuantum[0]?.sameAs, 'https://www.wikidata.org/wiki/Q17995793');

  const deepmind = matchEntities('Google DeepMind unveiled a new protein folding system.', 'en');
  assert.equal(deepmind[0]?.name, 'Google DeepMind');
  assert.equal(deepmind[0]?.sameAs, 'https://www.wikidata.org/wiki/Q15733006');

  const nvidia = matchEntities('NVIDIA yeni nesil Blackwell mimarisini duyurdu.', 'tr');
  assert.equal(nvidia[0]?.name, 'NVIDIA');
  assert.equal(nvidia[0]?.sameAs, 'https://www.wikidata.org/wiki/Q182477');

  const anthropic = matchEntities('Anthropic Claude model ailesine yeni özellikler ekledi.', 'tr');
  assert.equal(anthropic[0]?.name, 'Anthropic');
  assert.equal(anthropic[0]?.sameAs, 'https://www.wikidata.org/wiki/Q116758847');
});

test('findEntities partitions into about and mentions', () => {
  const text = 'OpenAI, Google DeepMind, Anthropic ve NVIDIA yapay zekâ pazarında yarışıyor.';
  const result = findEntities(text, 'en');
  assert.equal(result.about.length, 2);
  assert.ok(result.mentions.length >= 1);
});
