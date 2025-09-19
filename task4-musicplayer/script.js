const songs = [
  {title:'Song 1',src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
  {title:'Song 2',src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'},
  {title:'Song 3',src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'}
]
const audio = document.getElementById('audio')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')
const title = document.getElementById('title')
const progress = document.getElementById('progress')
const playlist = document.getElementById('playlist')
let idx = 0
function load(){
  audio.src = songs[idx].src
  title.textContent = songs[idx].title
  Array.from(playlist.children).forEach((li,i)=> li.classList.toggle('active', i===idx))
}
songs.forEach((s,i)=>{ const li = document.createElement('li'); li.textContent = s.title; li.addEventListener('click',()=>{ idx=i; load(); audio.play(); playBtn.textContent='Pause' }); playlist.appendChild(li) })
load()
playBtn.addEventListener('click',()=>{ if(audio.paused){ audio.play(); playBtn.textContent='Pause' }else{ audio.pause(); playBtn.textContent='Play' } })
nextBtn.addEventListener('click',()=>{ idx=(idx+1)%songs.length; load(); audio.play(); playBtn.textContent='Pause' })
prevBtn.addEventListener('click',()=>{ idx=(idx-1+songs.length)%songs.length; load(); audio.play(); playBtn.textContent='Pause' })
audio.addEventListener('timeupdate',()=>{ if(audio.duration) progress.value = (audio.currentTime/audio.duration)*100 })
progress.addEventListener('input', ()=>{ if(audio.duration) audio.currentTime = (progress.value/100)*audio.duration })
audio.addEventListener('ended', ()=>{ idx=(idx+1)%songs.length; load(); audio.play() })
