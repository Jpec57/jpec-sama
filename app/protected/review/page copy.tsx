// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";

// export default function ReviewPage() {
//   // const [showAnswer, setShowAnswer] = useState(false);
//   // const [userAnswer, setUserAnswer] = useState("");

//   // const question = "フランスの首都は何ですか？";
//   // const answer = "パリ";

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setShowAnswer(true);
//   // };

//   return (
//     <div className="flex flex-col items-center space-y-6">
//       <Card className="w-full max-w-md border-2">
//         <CardHeader>
//           <CardTitle>フラッシュカード復習</CardTitle>
//           <CardDescription>知識をテストしましょう</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-2xl font-semibold text-center mb-4">
//             {question}
//           </p>
//           <form onSubmit={handleSubmit}>
//             <Input
//               type="text"
//               placeholder="答えを入力してください"
//               value={userAnswer}
//               onChange={e => setUserAnswer(e.target.value)}
//               className="mb-4"
//             />
//             <Button
//               type="submit"
//               className="w-full "
//             >
//               回答を確認
//             </Button>
//           </form>
//         </CardContent>
//         {showAnswer &&
//           <CardFooter className="flex flex-col items-center">
//             <p className="text-lg mb-2">
//               正解: {answer}
//             </p>
//             <p className="text-lg mb-4">
//               {userAnswer.toLowerCase() === answer.toLowerCase()
//                 ? "正解です！"
//                 : "不正解です。もう一度試してみましょう。"}
//             </p>
//             <Button
//               onClick={() => {
//                 setShowAnswer(false);
//                 setUserAnswer("");
//               }}
//             >
//               次のカード
//             </Button>
//           </CardFooter>}
//       </Card>
//       <Button
//         variant="outline"
//         asChild
//       >
//         <Link href="/">ダッシュボードに戻る</Link>
//       </Button>
//     </div>
//   );
// }
