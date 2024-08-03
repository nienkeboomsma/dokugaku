import { NovelJSONContent } from '../../src/types/NovelJSONContent'

export const mockNovelTextNodes: NovelJSONContent[] = [
  { type: 'h1', content: ['セーラー服と機関銃'], paragraphNumber: 1 },
  { type: 'h2', content: ['プロローグ'], paragraphNumber: 2 },
  {
    type: 'p',
    content: [
      '　木立に囲まれ、',
      {
        type: 'ruby',
        content: [
          '朝',
          { type: 'rt', content: ['あさ'] },
          '靄',
          { type: 'rt', content: ['もや'] },
        ],
      },
      'の立ちこめる国道を、一台の小型車が',
      {
        type: 'ruby',
        content: [
          '疾',
          { type: 'rt', content: ['しつ'] },
          '走',
          { type: 'rt', content: ['そう'] },
        ],
      },
      'していた。ところどころでは',
      { type: 'ruby', content: ['濃', { type: 'rt', content: ['こ'] }] },
      'い',
      { type: 'ruby', content: ['靄', { type: 'rt', content: ['もや'] }] },
      'のせいで、ヘッドライトを',
      { type: 'ruby', content: ['点', { type: 'rt', content: ['つ'] }] },
      'けなければならないほどなのだから、その',
      {
        type: 'em',
        content: ['スピード'],
      },
      'は',
      {
        type: 'ruby',
        content: [
          '無',
          { type: 'rt', content: ['む'] },
          '鉄',
          { type: 'rt', content: ['てつ'] },
          '砲',
          { type: 'rt', content: ['ぽう'] },
        ],
      },
      'とさえ言える。',
    ],
    paragraphNumber: 3,
  },
  {
    type: 'p',
    content: [
      '　太陽を西から昇らせているのは、尾田医師の',
      {
        type: 'ruby',
        content: [
          '脇',
          { type: 'rt', content: ['わき'] },
          '腹',
          { type: 'rt', content: ['ばら'] },
        ],
      },
      'にピタリと',
      { type: 'ruby', content: ['押', { type: 'rt', content: ['お'] }] },
      'し当てられた',
      {
        type: 'ruby',
        content: ['匕首', { type: 'rt', content: ['あいくち'] }],
      },
      'だった。',
    ],
    paragraphNumber: 4,
  },
  { type: 'hr', paragraphNumber: 5 },
  {
    type: 'p',
    content: [
      'κα',
      {
        type: 'img',
        attributes: { src: '00004.webp', alt: '', title: 'inline' },
      },
      ' σ',
      {
        type: 'img',
        attributes: { src: '00005.webp', alt: '', title: 'inline' },
      },
      ' τ',
      {
        type: 'img',
        attributes: { src: '00006.webp', alt: '', title: 'inline' },
      },
      'κνον;',
    ],
    paragraphNumber: 6,
  },
  {
    type: 'p',
    content: [
      {
        type: 'img',
        attributes: { src: '00003.webp', alt: '', title: 'block' },
      },
    ],
    paragraphNumber: 7,
  },
  {
    type: 'p',
    content: [
      '「現代のおしゃべり」と「古典」というのは、全然関係ないと思っている人は多いと思います。ところが、そうではないのです。「おしゃべり」とか「話し言葉」なんかとはまったく関係なくて無縁だと思われてる「昔の古典」が、じつは、「現代の言葉」と大きな関係を持っているのです。そういうことを忘れてしまっているから、話し言葉の混乱だって起こる。そんなことだってあるのです。',
    ],
    paragraphNumber: 8,
  },
  {
    type: 'blockquote',
    content: [
      {
        type: 'p',
        content: ['　後鳥羽上皇の歌みたいのは、「帝王ぶり」と言うんです。'],
        paragraphNumber: 9,
      },
      {
        type: 'p',
        content: [
          '　「少しふざけたかもしれないので、ちょっとまじめにしめます。」',
        ],
        paragraphNumber: 10,
      },
    ],
  },
  {
    type: 'p',
    content: [
      '　しかし、それだけではありません。ラテン語はみなさんが想像しているより広い分野で、より長い期間にわたって使われているのです。',
    ],
    paragraphNumber: 11,
  },
  {
    type: 'h2',
    content: ['もう一度の例'],
    paragraphNumber: 12,
  },
  {
    type: 'h3',
    content: ['ペン'],
    paragraphNumber: 13,
  },
  {
    type: 'h4',
    content: [
      'これは',
      // @ts-expect-error: Invalid element
      { type: 'a', content: ['例の文章'], attributes: { href: 'test' } },
      'です',
    ],
    paragraphNumber: 14,
  },
  {
    type: 'p',
    content: [
      '　――女は、',
      { type: 'ruby', content: ['寂', { type: 'rt', content: ['さび'] }] },
      'しい口調でポツリと',
      { type: 'ruby', content: ['呟', { type: 'rt', content: ['つぶや'] }] },
      'いた。まだ若い。二十二、三というところだろうか。長い',
      { type: 'ruby', content: ['髪', { type: 'rt', content: ['かみ'] }] },
      '、だぶだぶのスポーツシャツ、ジーパンというスタイルで、すり切れそうなサンダルをはいて、大きな',
      {
        type: 'ruby',
        content: [
          '布',
          { type: 'rt', content: ['ぬの'] },
          '袋',
          { type: 'rt', content: ['ぶくろ'] },
        ],
      },
      'を引きずるように下げている。一歩',
      {
        type: 'ruby',
        content: [
          '間',
          { type: 'rt', content: ['ま'] },
          '違',
          { type: 'rt', content: ['ちが'] },
        ],
      },
      'えばフーテンという感じ。ちょっと',
      { type: 'ruby', content: ['顎', { type: 'rt', content: ['あご'] }] },
      'の張った顔立ちは、大きな目、',
      {
        type: 'ruby',
        content: [
          '下',
          { type: 'rt', content: ['した'] },
          '唇',
          { type: 'rt', content: ['くちびる'] },
        ],
      },
      'の厚い大きな口など、',
      { type: 'ruby', content: ['可愛', { type: 'rt', content: ['かわい'] }] },
      'くないこともないのだが、どこかしまらない、というか、ポサッとした感じだ。',
    ],
    paragraphNumber: 15,
  },
]
