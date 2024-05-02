import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'

//matcap uses images from a server

export default function Experience()
{
    const [matcapTexture] = useMatcapTexture('C8C8C8_010101_010101_010101_010101',256)

    //2nd param is width

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

       <Center>
            <Text3D font="./fonts/helvetiker_regular.typeface.json"
             size={ 0.75 }
             height={ 0.2 }
             curveSegments={ 12 }
             bevelEnabled
             bevelThickness={ 0.02 }
             bevelSize={ 0.02 }
             bevelOffset={ 0 }
             bevelSegments={ 5 }
            >
                Hello, 3D world!
                <meshMatcapMaterial matcap={matcapTexture} />
            </Text3D>
        </Center>
        
    </>
}