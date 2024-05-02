import { useMemo, useRef } from 'react';
import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useFrame } from '@react-three/fiber';

export default function Experience() {
    const [matcapTexture] = useMatcapTexture('537387_75BBB9_152E5B_0E85E8', 256);
    const tempArray = new Array(300).fill().map(() => (Math.random() > 0.5 ? 1 : -1));
    //first I set up an array of 300 with either -1 or 1 as the element
    const meshRefs = useRef([]);
    meshRefs.current = meshRefs.current.slice(0, tempArray.length);
    //then I create a ref to hold the mesh elements starting at 0 and ending at the length of the tempArray

    useFrame(() => {
        meshRefs.current.forEach((mesh, index) => {
            if (mesh) {
                mesh.rotation.x += 0.05 * tempArray[index];
                mesh.rotation.y += 0.05 * tempArray[index];
            }
        });
    });
    //then I use the useFrame hook to rotate each mesh element in the array

    return (
        <>
            <Perf position="top-left" />
            <OrbitControls makeDefault />
            <Center>
                <Text3D
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={0.2}
                    curveSegments={15}
                    bevelEnabled
                    bevelThickness={0.05}
                    bevelSize={0.03}
                    bevelOffset={0}
                    bevelSegments={10}
                >
                    Hello, 3D world!
                    <meshMatcapMaterial matcap={matcapTexture} />
                </Text3D>
            </Center>
            {tempArray.map((_, index) => (
                <mesh
                    ref={(ref) => (meshRefs.current[index] = ref)}
                    key={index}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                    ]}
                    scale={0.1 + Math.random() * 0.002}
                >
                    <torusGeometry args={[1, 0.6, 16, 32]} />
                    <meshMatcapMaterial matcap={matcapTexture} />
                </mesh>
            ))}
        </>
    );
}