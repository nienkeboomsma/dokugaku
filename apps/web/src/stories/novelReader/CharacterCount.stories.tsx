import type { Meta, StoryObj } from '@storybook/react'

import CharacterCount from '../../components/NovelReader/CharacterCount'
import { useCharacterCount } from '../../hooks/useCharacterCount'

const meta: Meta<typeof CharacterCount> = {
  title: 'Novel reader/Character count',
  component: CharacterCount,
  parameters: {
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof meta>

export const Hundreds: Story = {
  args: {
    charCount: 233,
    hideBelow: 10,
  },
}

export const Thousands: Story = {
  args: {
    charCount: 32456,
    hideBelow: 10,
  },
}

export const Interactive: Story = {
  args: {
    hideBelow: 10,
  },
  decorators: [
    (Story, context) => {
      const charCount = useCharacterCount()
      return (
        <>
          <p style={{ padding: '1rem 2rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eros
            augue, tempus a eros eget, tempor consectetur risus. In id lorem
            justo. Ut a nunc auctor, rutrum velit eu, mollis velit. Ut cursus
            arcu non purus pulvinar, eget ultrices felis pharetra. Mauris felis
            turpis, imperdiet ut malesuada sit amet, pellentesque sed ex. Morbi
            fringilla est nisi, id fermentum justo gravida eu. Integer maximus
            enim sed turpis bibendum fermentum. Nullam volutpat velit nunc, ac
            varius nisi venenatis eget. Pellentesque vel aliquet nunc. Maecenas
            eu elit magna. Praesent ipsum tortor, venenatis mattis ultricies
            vel, efficitur bibendum nisl. Aenean aliquet dolor eget diam
            euismod, egestas ultricies ligula consectetur. Integer malesuada
            libero in viverra tincidunt. Proin pretium, ligula at posuere
            faucibus, dolor elit hendrerit dolor, non mollis velit nibh non
            dolor. Donec vestibulum eleifend sapien, rutrum ultrices velit
            imperdiet sit amet. Ut enim lorem, aliquet sed convallis
            scelerisque, varius ut sem. Etiam aliquam rutrum arcu, vel dapibus
            tortor pellentesque ac. Ut venenatis, quam in varius ornare, libero
            est feugiat nibh, id accumsan odio purus eget velit. Proin fringilla
            venenatis justo sit amet tempus. Aenean sit amet consectetur ex, et
            accumsan dui. Vestibulum vulputate et mi et blandit. Quisque
            sagittis ipsum sed est congue facilisis in efficitur ligula. Fusce
            vitae dictum augue, non rutrum nisl. Donec scelerisque dignissim
            erat, quis bibendum elit aliquam sed. Donec dignissim, leo a
            interdum aliquam, tellus elit molestie arcu, a faucibus nisi quam
            rutrum nibh. Vivamus rhoncus neque ut efficitur pellentesque.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Proin pretium facilisis eros. Etiam tempus
            augue sit amet nisl interdum, quis mattis felis sodales. Donec
            efficitur sit amet augue nec suscipit. Morbi at ullamcorper neque,
            quis iaculis nulla. Etiam sed sapien gravida, elementum leo non,
            mollis nisi. Sed id pulvinar ex, at gravida libero. Maecenas augue
            turpis, maximus vel dictum non, auctor ac justo. Mauris vitae tempus
            velit. Sed semper, libero pretium tristique molestie, elit est
            suscipit erat, vel maximus magna felis at massa. Nam lacinia
            vehicula felis, id lacinia justo posuere in. Cras ac turpis
            pellentesque, aliquet massa at, pellentesque magna. Morbi in orci
            dolor. Vivamus sit amet justo nulla. Pellentesque ante odio, auctor
            quis ultricies vulputate, pretium quis turpis. Nulla vulputate
            dictum ipsum a facilisis. Nulla et interdum nisi. Proin lobortis
            eleifend diam. Fusce ac orci nisl. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Maecenas
            condimentum at velit quis laoreet. Praesent ullamcorper eros vel
            lorem imperdiet pellentesque. Praesent accumsan nisi vel purus
            consequat, pulvinar volutpat massa eleifend. Vivamus porta vehicula
            massa quis vehicula. Phasellus pulvinar quam quis metus euismod, in
            tincidunt dolor condimentum. Morbi turpis ipsum, congue a arcu sit
            amet, faucibus lacinia justo. Integer bibendum egestas finibus. Ut
            nec purus sapien. Fusce et tortor mattis, finibus purus in, eleifend
            nisl. Nullam vitae velit orci. Sed vulputate auctor mollis. Aenean
            ultrices, elit in elementum congue, massa justo rhoncus nibh, ac
            accumsan odio risus ac ante. Duis vel elementum mauris. Etiam rutrum
            lacus orci, ac tempus mauris tristique et. Curabitur convallis
            pulvinar eros et ornare. Nulla a ipsum vitae sapien porta tempus ut
            sed tellus. Aliquam viverra nisi nisl, at placerat nisl posuere sit
            amet. Nam et euismod massa. Sed in mi ultrices enim condimentum
            faucibus vestibulum a leo.
          </p>
          <Story args={{ ...context.args, charCount }} />
        </>
      )
    },
  ],
}

export default meta
