
let state={score:0,teliti:50,disiplin:50,aman:50};

const scenes=[
{
title:"06:30 - Datang ke DC",
story:"Anda datang untuk shift pertama.",
choices:[
{text:"Finger print kehadiran lalu ke Chief Delivery",effect:{score:10,disiplin:10},next:1},
{text:"Ngobrol dulu sambil minum kopi",effect:{score:-10,disiplin:-10},next:1}
]
},
{
title:"06:45 - Ambil Dokumen",
story:"Chief menyerahkan STNK, KIR dan RNPB.",
choices:[
{text:"Periksa satu per satu",effect:{score:10,teliti:10},next:2},
{text:"Masukkan tas tanpa cek",effect:{score:-10,teliti:-10},next:2}
]
},
{
title:"07:00 - Pemeriksaan Kendaraan",
story:"Anda menemukan salah satu lampu belakang mati.",
choices:[
{text:"Lapor dan minta perbaikan",effect:{score:15,aman:15},next:3},
{text:"Abaikan, masih bisa jalan",effect:{score:-15,aman:-15},next:3}
]
},
{
title:"08:15 - Toko Pertama",
story:"Pemegang shift menawarkan mengoperasikan tailgate.",
choices:[
{text:"Tolak, tailgate hanya driver",effect:{score:15,aman:10},next:4},
{text:"Persilakan saja",effect:{score:-20,aman:-20},next:4}
]
},
{
title:"08:30 - Pengecekan Rokok",
story:"Dokumen 50 slop, fisik 48 slop.",
choices:[
{text:"Buat berita acara",effect:{score:20,teliti:15},next:5},
{text:"Anggap tidak masalah",effect:{score:-25,teliti:-20},next:5}
]
},
{
title:"11:00 - Retur Toko",
story:"NRB mencatat 15 koli, fisik 14 koli.",
choices:[
{text:"Hitung ulang dan klarifikasi",effect:{score:20,teliti:15},next:6},
{text:"Tanda tangan saja",effect:{score:-20,teliti:-15},next:6}
]
},
{
title:"13:00 - Jalan Menuju Toko Berikutnya",
story:"Anda terlambat 15 menit.",
choices:[
{text:"Ngebut untuk mengejar waktu",effect:{score:-10,aman:-15},next:7},
{text:"Tetap sesuai aturan lalu lapor Chief",effect:{score:10,aman:10,disiplin:10},next:7}
]
},
{
title:"17:00 - Kembali ke DC",
story:"Saat inspeksi ditemukan kendaraan lecet kecil.",
choices:[
{text:"Langsung laporkan kejadian",effect:{score:10,disiplin:10},next:"end"},
{text:"Semoga tidak ketahuan",effect:{score:-20,disiplin:-20},next:"end"}
]
}
];

function updateStats(){
document.getElementById("score").innerText=state.score;
document.getElementById("teliti").innerText=state.teliti;
document.getElementById("disiplin").innerText=state.disiplin;
document.getElementById("aman").innerText=state.aman;
}

function renderScene(i){
const s=scenes[i];
document.getElementById("title").innerText=s.title;
document.getElementById("story").innerText=s.story;

const c=document.getElementById("choices");
c.innerHTML="";

s.choices.forEach(ch=>{
let b=document.createElement("button");
b.innerText=ch.text;
b.onclick=()=>{
Object.keys(ch.effect).forEach(k=>state[k]+=ch.effect[k]);

if(ch.next==="end"){ ending(); return; }

updateStats();
renderScene(ch.next);
};
c.appendChild(b);
});
}

function ending(){
updateStats();

let rank="Training Ulang";
if(state.score>=70) rank="Driver Teladan";
else if(state.score>=30) rank="Driver Siap Bertugas";

document.getElementById("title").innerText="HASIL AKHIR";
document.getElementById("story").innerHTML=
"Skor: "+state.score+
"<br>Ketelitian: "+state.teliti+
"<br>Disiplin: "+state.disiplin+
"<br>Keselamatan: "+state.aman+
"<br><br>Status: <b>"+rank+"</b>";

document.getElementById("choices").innerHTML="";
}

updateStats();
renderScene(0);
