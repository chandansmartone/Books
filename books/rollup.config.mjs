import external from 'rollup-plugin-peer-deps-external';

export default [
  {
    plugins: [
      external(),
      // your other plugins
    ],
    external: ["react", "react-dom"],
    // rest of your config
  }
];