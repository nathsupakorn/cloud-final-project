const CAPTIONS = [
    {
        type: 'CALM',
        captions: [
            "ชิลๆ",
            "สบาย",
            "อิอิ",
            "เยี่ยม"
        ]
    }, 
    {
        type: 'SAD',
        captions: [
            "โอ้ นี่หรือความเศร้า",
            "เศร้านะ",
            "แง",
            "TT",
            "เป็นเศร้า"
        ]
    },
    {
        type: 'SURPRISED',
        captions: [
            "ว้าว ซ่า",
            "วันเดอร์ฟูลมาก",
            "OMG",
            "โอ้มายกอช",
            "เซอร์ไพร์ซ์"
        ]
    },
    {
        type: 'FEAR',
        captions: [
            "ขนลุกซู่",
            "บรึ้ย~",
            "น่ากลัว",
            "ขนหัวลุก"
        ]
    },
    {
        type: 'CONFUSED',
        captions: [
            "งงมาก",
            "อีหยังวะ",
            "อะไร",
            "อะไรเอ่ย",
            "งอง",
            "ห๊ะ",
            "สับสนไปหมด",
            "ฉันปวดหัวมากนะ"
        ]
    },
    {
        type: 'ANGRY',
        captions: [
            "โกรธละนะ",
            "กริ้ว"
        ]
    },
    {
        type: 'DISGUSTED',
        captions: [
            "อี๋",
            "อีลลล",
            "หยี"
        ]
    },
    {
        type: 'HAPPY',
        captions: [
            "เริ่ด",
            "แฮปปี้",
            "เยี่ยมจริงๆ"
        ]
    },
];

const NEUTRAL_WORDS = [
    "เธอมันแน่",
    "Hello, world!",
    "CLOUD IS COMMING",
    "CLOUD IS CALLING",
    "100100101101101",
    "เธอเห็นเมฆก้อนนั้นไหมหละ อ่อนั่นวิชาcloud",
    "Hello the universe",
    "ยังไงเอ่ย",
    "สวัสดีวันส่งงานจ้า",
    "DEADLINE IS COMING",
    "FC CLOUD COMP",
    "FC JONG-TAM-THA",
    "จงเจริญหรือจะสู้ชงเจริญ",
    "คอมเบียวมานะคะ",
    "สมุนจินนี่",
    "เรามันดาวทวิต",
    "พักนะคะ คุณนิสิต",
    "HELLO DEMO DAY",
    "i don't care",
    ":-)",
    "เรามันตัวแม่",
    "เรามันตัวสูติ",
    "Do you want to do this",
    "คุณนิสิต",
    "วันไนท์มิราเคิล",
    "ซีนเริ่ด",
    "นักจะแกง",
    "แกงหม้อใหญ่",
    "แกงไหม ยังไง",
    "จ้อจี้",
    "จิตอ่อนมาก",
    "รอชมความปัง",
    "บูดมาก",
    "สวยพี่สวย",
    "คนเค้าดูออกค่ะ",
    "แกจะแรงเพื่อ",
    "งานไม่ใหญ่แน่นะวิ",
    "งานเล็กๆ แต่งตัวง่ายๆ สบายๆ",
    "อาจเป็นเพราะเลือดกรุ๊ปบีด้วย",
    "ไม่ได้แก ฉันเลือดกรุ๊ปบี",
    "ก็พูดๆไปก่อน",
    "แบบใหม่แบบสับ",
    "นี่นะหรือ นพนภา",
    "อย่าหาทำ",
    "รวย รวย รวย",
    "อ๊อตตอกเค",
    "เกมได้ไง",
    "เรามันตัวมัม",
    "ใครไหวไปก่อนเลย",
    "ดือมาก",
    "เบียวนะ",
    "หวานเจี๊ยบ",
    "เหมียนหมา",
    "ปากอย่างแซ่บ",
    "แกคิดเหมือนชั้ลไหม B1",
    "ใช่เลย B2",
    "ไม่ได้อยากเป็นเพื่อนค่ะ",
    "อยากเป็นแฟน",
    "อยากเป็นศัตรู",
    "เอางี้นะ",
    "ล็อคมง",
    "มงแถ",
    "แตกหนึ่ง",
    "อีซี่",
    "เอนจอยด์",
    "ปล่อยจอย",
    "มีแต่เกลือ",
    "ไก่เกิน",
    "ตีเธอด้วยอะไรดี",
    "คือบับ",
    "ปวดหัว",
    "ทำทำไม",
    "หงายการ์ดรู้เท่าไม่ถึงการณ์",
    "เพชรเห็นเพชรแทงนะคะ",
    "เราคนเดียวจะไปสู้ไหวหรอ",
    "มุนินทร์ มุตตา",
    "กาสะลอง ซ้องปีบ",
    "นาตาชาโรมานอฟ",
    "ลูกท่านทูต",
    "เต็มคาราเบล",
    "ดุดันไม่เกรงใจใคร",
    "แดงไหน",
    "พูดได้ไหม",
    "นรก is coming",
    "💩",
    "🍌",
    "🌩️",
    "🍑",
    "ตื่นค่ะ",
    "กลั้น",
    "ไม่พูดดีกว่า",
    "อย่ามั่นเกิน",
    "จะแล้วไหม",
    "ด้่ายหรอเนี่ย",
    "เบาได้เบา",
    "เฉียบ",
    "บลูเบอรรี่มาก",
    "หล่อนมีพิรุธอีกแล้วนะ",
    "หนูไม่ใช่ลูกป๊าหรอ",
    "ใครพ่อแก",
    "ฆ่าได้ฆ่า",
    "บีก็ทำไม่ได้ คริสหรออย่าหวังเลย",
    "ทุกคนมีแม่คนเดียวโกโก้",
    "ไพลินชอบกินกล้วยค่ะ",
    "ปั่นจัด",
    "ได้ครับจาร",
    "บาย",
    "ช็อตฟีลมาก",
    "ชอบนะคะ อยากได้",
    "เลิกปลอม",
    "ขอโทษนะ แต่เดี๊ยนไม่ผิด",
    "จะบ้าตายรายวัน",
    "น็อต ทู เดย์จ้า",
    "โลกกลม สังคมเหลี่ยม",
    "เกลียด",
    "แผนของพี่คือทำชีงง",
    "๕๕๕๕๕๕",
    "Docker compose up -d",
    "บีบมือแน่น",
    "แลง",
    "เอาเลย",
    "เริ่มเลย",
    "พร้อม",
    "เกียมขิต",
    "จังงาย",
    "พบภัยความมั่น",
    "สู้เขาสิวะอีหญิง",
    "สภาพ",
    "อย่านะคะ",
    "ใครเอ่ย",
    "มีส้มมีกล้วยแต่เธอเลือกมัน",
    "มาเอาไร",
    "ไอ้ต้าว",
    "ขอเผือกหน่อยแน",
    "เปนไร",
    "ลำไยปะให้ทาย",
    "Who care คะ",
    "ว้อท",
    "คิมิโนโต๊ะ",
    "ใครรู้แต่*ูไม่รู้",
    "เป็นนางฟ้าแต่ใส่หน้าได้นะคะ",
    "มาเรย",
    "HYPE BOY",
    "ทรงอย่างแบด",
    "อย่ามาเล่นกับไฟ",
    "ไฟจะไหม้ เทวดาจะผลักไฟ",
    "มอง",
    "ขอบคุณที่กล้าสอนหนู",
    "ยืนหนึ่ง",
    "เรามันตัวเตง",
    "โทษ*ูได้เลย",
    "สู้ได้",
    "ต๊าช",
    "ปลาทับใจ",
    "วงการบันเทิงอะนะ",
    "แกแรงเกิน"
];

const NO_PHOTO_WORD = [
    "ว้าย ไม่เห็นหน้า",
    "404 NOT FOUND YOUR FACE",
    "แกเอาหน้าไปไว้ไหนเนี่ย",
    "ฉันรู้ทัน อย่ามาปิดหน้าเลย",
    "นั่นไง เล่นไม่ซื่อ",
    "เอาคะแนนไปแค่นี้พอ",
    "แหมพ่อซ่อนรูป",
    "ทำมาเป็นหลบ",
    "เล่นซ่อนแอบอยู่หรอ",
    "อย่าให้ฉันรู้นะ",
    "ทำเคอะเขิน"
];

const ARRAYWORD = CAPTIONS.reduce((accu, curr) => {
    return accu.concat(curr.captions);
}, []);

export { CAPTIONS, ARRAYWORD, NEUTRAL_WORDS, NO_PHOTO_WORD };