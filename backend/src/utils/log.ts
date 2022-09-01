import chalk from "chalk";

const serverStart = (env: string, serverPort: number | string): void => {
  console.log(
    `${chalk.gray(
      "┌────────────────────────────────────────────────────────────────────────────┐"
    )}`
  );
  console.log(
    `${chalk.gray("│")} [ ${chalk.cyan("SERVER")} ] mode: ${chalk
      .rgb(176, 47, 42)
      .underline(env)}\t\t\t\t\t\t ${chalk.gray("│")}`
  );
  console.log(
    `${chalk.gray("│")} [ ${chalk.cyan(
      "SERVER"
    )} ] port: ${serverPort}\t\t\t\t\t\t\t ${chalk.gray("│")}`
  );
  console.log(
    `${chalk.gray(
      "└────────────────────────────────────────────────────────────────────────────┘"
    )}`
  );
};

export default {
  serverStart,
};
