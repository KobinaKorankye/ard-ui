"use client";

import Lottie from 'lottie-react';
import bot from './lotties/bot.json';
import bothead from './lotties/bothead.json';

interface Props {
    style?: any,
    animationName: 'bot' | 'bothead'
}

const animations = {
    bot, bothead
}

export default function Loader({ style: s, animationName }: Props) {
    return (
        <Lottie style={{ width: '10rem', ...s }} animationData={animations[animationName]} />
    )
};
