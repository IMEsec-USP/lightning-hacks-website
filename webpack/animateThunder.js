import anime from 'animejs'

const shardAnimationDetails = {
    duration: 500,
    endDelay: 70,
    easing: 'steps(1)',
    loop: true,
    direction: 'alternate',
}

const lightningAnimationDetails = {
    ...shardAnimationDetails,
    easing: 'steps(4)',
}

anime({
    targets: '.animate-thunder .shard1',
    translateY: 70,
    rotate: -20,
    ...shardAnimationDetails,
})

anime({
    targets: '.animate-thunder .shard2',
    translateY: 50,
    rotate: -15,
    ...shardAnimationDetails,
})

anime({
    targets: '.animate-thunder .shard3',
    translateY: -45,
    translateX: 20,
    rotate: 10,
    ...shardAnimationDetails,
})

anime({
    targets: '.animate-thunder .shard4',
    translateY: -65,
    translateX: 45,
    rotate: 15,
    ...shardAnimationDetails,
})

anime({
    targets: '.animate-thunder .lightning-hollow',
    translateY: -2,
    ...lightningAnimationDetails,
})

anime({
    targets: '.animate-thunder .lightning-full',
    translateY: 2,
    ...lightningAnimationDetails,
})
