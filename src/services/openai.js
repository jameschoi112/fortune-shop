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
          "content": "당신은 전문 점성술사입니다. 사용자의 정보를 바탕으로 오늘의 운세를 제공합니다. 운세는 총운, 애정운, 금전운, 학업운으로 구분하여 각각 4-5문장으로 작성해주세요."
        },
        {
          "role": "user",
          "content": `이름: ${userInfo.name}, 성별: ${userInfo.gender}, 생년월일: ${userInfo.birthdate} (${userInfo.calendar})`
        }
      ],
      temperature: 0.8,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error('운세 생성 중 오류가 발생했습니다.');
  }
};