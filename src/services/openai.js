// src/services/openai.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateFortune = async (userInfo) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          "role": "system",
          "content": `당신은 전문 점성술사입니다. 사용자의 정보를 바탕으로 오늘의 운세를 제공합니다.
          각 운세는 다음 형식으로 제공해주세요:

          1. 먼저 각 영역의 수치를 0-100 사이의 숫자로 제공:
          [수치]
          학업/직장: XX
          재물: XX
          애정: XX
          인간관계: XX
          건강: XX
          행운: XX
          [/수치]

          2. 이후 각 운세를 4~5 문장으로 상세히 설명:

          총운: (설명...)

          애정운: (설명...)

          금전운: (설명...)

          학업운: (설명...)`
        },
        {
          "role": "user",
          "content": `이름: ${userInfo.name}, 성별: ${userInfo.gender}, 생년월일: ${userInfo.birthdate} (${userInfo.calendar})`
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error('운세 생성 중 오류가 발생했습니다.');
  }
};