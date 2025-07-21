"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { RegExpParser } from "regexpp";

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#039;";
      default:
        return m;
    }
  });
}

function highlightMatches(text: string, regex: RegExp) {
  const matches = [];
  let lastIndex = 0;
  let result;

  while ((result = regex.exec(text)) !== null) {
    const [match] = result;
    const start = result.index;
    const end = start + match.length;

    if (start > lastIndex) {
      matches.push({
        text: text.slice(lastIndex, start),
        match: false,
      });
    }
    matches.push({
      text: text.slice(start, end),
      match: true,
    });

    lastIndex = end;

    if (match.length === 0) {
      regex.lastIndex++;
    }
  }

  if (lastIndex < text.length) {
    matches.push({
      text: text.slice(lastIndex),
      match: false,
    });
  }

  return matches;
}

function explainRegex(pattern: string) {
  try {
    const parser = new RegExpParser();
    const ast: any = parser.parsePattern(pattern);

    const explanation: any = ast.elements.map((el: any) => el.type).join(", ");

    return `Pattern contains: ${explanation}`;
  } catch {
    return "Invalid regex pattern";
  }
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const regex = useMemo(() => {
    try {
      setIsValid(true);
      setErrorMsg("");
      return new RegExp(pattern, flags);
    } catch (e: any) {
      setIsValid(false);
      setErrorMsg(e.message);
      return null;
    }
  }, [pattern, flags]);

  const matches = regex ? highlightMatches(text, regex) : [];

  const explanation = regex ? explainRegex(pattern) : "";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="max-w-3xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Regex Tester</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="pattern">Regular Expression Pattern</Label>
            <Input
              id="pattern"
              placeholder="Enter regex pattern (without slashes)"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className={!isValid ? "border-red-600" : ""}
            />
            {!isValid && (
              <p className="text-red-600 mt-1 text-sm">{errorMsg}</p>
            )}
          </div>

          <div>
            <Label htmlFor="flags">Flags</Label>
            <Input
              id="flags"
              placeholder="e.g. g, i, m"
              maxLength={5}
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className={!isValid ? "border-red-600" : ""}
            />
          </div>

          <div>
            <Label htmlFor="testText">Test Text</Label>
            <Textarea
              id="testText"
              rows={5}
              placeholder="Enter text to test"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {regex && (
            <>
              <div>
                <Label>Match Result:</Label>
                {matches.length === 0 ? (
                  <p>No matches found.</p>
                ) : (
                  <p>
                    Matches found:{" "}
                    <strong>{matches.filter((m) => m.match).length}</strong>
                  </p>
                )}
              </div>

              <div className="bg-gray-100 p-3 rounded font-mono whitespace-pre-wrap break-words">
                {matches.map((segment, i) =>
                  segment.match ? (
                    <mark
                      key={i}
                      className="bg-yellow-300"
                      style={{ padding: "0 2px" }}
                    >
                      {escapeHtml(segment.text)}
                    </mark>
                  ) : (
                    <span key={i}>{escapeHtml(segment.text)}</span>
                  ),
                )}
              </div>

              <div>
                <Label>Regex Explanation:</Label>
                <pre className="bg-muted p-3 rounded text-sm whitespace-pre-wrap">
                  {explanation}
                </pre>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
